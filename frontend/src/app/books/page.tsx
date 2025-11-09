'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import bookService from '@/services/bookService';
import { Book, CreateBookData } from '@/types/book.types';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useToast } from '@/components/ToastContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function BooksPage() {
  const router = useRouter();
  const toast = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTokenInfo, setShowTokenInfo] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'delete' | 'logout' | 'warning';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'warning',
  });
  const [formData, setFormData] = useState<CreateBookData>({
    title: '',
    author: '',
    published_year: new Date().getFullYear(),
    isbn: '',
    genre: '',
    editorial: '',
    language: '',
    pages: undefined,
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadBooks();
    loadTokenInfo();
  }, [router]);

  // Actualizar información del token cada segundo
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      return;
    }

    const interval = setInterval(() => {
      loadTokenInfo();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadTokenInfo = () => {
    const info = authService.getTokenInfo();
    setTokenInfo(info);
  };

  // Prevenir navegación hacia atrás al login/register después de autenticarse
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      return;
    }

    window.history.pushState(null, '', window.location.href);
    
    const handlePopState = () => {
      if (authService.isAuthenticated()) {
        // Si está autenticado y trata de volver, mantenerlo en la página actual
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await bookService.getAllBooks(false); // Force fresh data
      setBooks(response.books);
      setError('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar libros';
      setError(errorMessage);
      toast.error('Error al cargar libros', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleShowDetail = (book: Book) => {
    setSelectedBook(book);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedBook(null);
  };

  const handleLogout = () => {
    setConfirmModal({
      isOpen: true,
      title: '¿Cerrar Sesión?',
      message: '¿Estás seguro de que quieres cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder a tu biblioteca.',
      type: 'logout',
      onConfirm: () => {
        authService.logout();
        toast.success('Sesión cerrada', 'Has cerrado sesión correctamente');
        router.push('/login');
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleOpenModal = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        author: book.author,
        published_year: book.published_year,
        isbn: book.isbn,
        genre: book.genre || '',
        editorial: book.editorial || '',
        language: book.language || '',
        pages: book.pages || undefined,
      });
    } else {
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        published_year: new Date().getFullYear(),
        isbn: '',
        genre: '',
        editorial: '',
        language: '',
        pages: undefined,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      published_year: new Date().getFullYear(),
      isbn: '',
      genre: '',
      editorial: '',
      language: '',
      pages: undefined,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await bookService.updateBook(editingBook.id, formData);
        toast.success('¡Libro actualizado!', `"${formData.title}" ha sido actualizado exitosamente.`);
      } else {
        await bookService.createBook(formData);
        toast.success('¡Libro agregado!', `"${formData.title}" ha sido agregado a tu biblioteca.`);
      }
      await loadBooks();
      handleCloseModal();
      setError('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar libro';
      setError(errorMessage);
      toast.error('Error al guardar libro', errorMessage);
    }
  };

  const handleDelete = (book: Book) => {
    setConfirmModal({
      isOpen: true,
      title: '¿Eliminar Libro?',
      message: `¿Estás seguro de que quieres eliminar "${book.title}" de tu biblioteca? Esta acción no se puede deshacer.`,
      type: 'delete',
      onConfirm: async () => {
        try {
          await bookService.deleteBook(book.id);
          await loadBooks();
          toast.success('¡Libro eliminado!', `"${book.title}" ha sido eliminado de tu biblioteca.`);
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Error al eliminar libro';
          setError(errorMessage);
          toast.error('Error al eliminar libro', errorMessage);
        }
      },
    });
  };

  const currentUser = authService.getCurrentUser();

  if (loading) {
    return <LoadingSpinner fullScreen text="Cargando biblioteca..." size="xl" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header mejorado */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Mi Biblioteca
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Bienvenido, <span className="font-bold text-blue-600 dark:text-blue-400">{currentUser?.username}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Botón para ver clima */}
              <button
                onClick={() => router.push('/weather')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group"
                title="Ver clima"
              >
                <span className="text-xl">🌤️</span>
                <span className="hidden sm:inline">Clima</span>
              </button>

              {/* Botón para ver info del token */}
              <button 
                onClick={() => setShowTokenInfo(true)} 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group"
                title="Ver información del token"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span className="hidden sm:inline">Token</span>
              </button>
              
              <button 
                onClick={handleLogout} 
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Cerrar Sesión</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 text-red-700 px-5 py-4 rounded-xl flex items-center gap-3 shadow-lg animate-shake">
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Mis Libros
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {books.length} {books.length === 1 ? 'libro registrado' : 'libros registrados'}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Agregar Libro</span>
          </button>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="card text-center py-16 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 p-8 rounded-full">
                <svg className="w-20 h-20 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              No hay libros registrados
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
              Comienza agregando tu primer libro a la biblioteca
            </p>
            <button 
              onClick={() => handleOpenModal()} 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Agregar tu primer libro</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{books.map((book) => (
              <div key={book.id} className="group card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Barra superior colorida */}
                <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
                
                <div className="p-6">
                  {/* Título del libro */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                  </div>

                  {/* Información del libro */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-medium">{book.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">{book.published_year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <span className="text-sm font-mono">{book.isbn}</span>
                    </div>
                    {book.genre && (
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="text-sm">{book.genre}</span>
                      </div>
                    )}
                    {book.pages && (
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">{book.pages} páginas</span>
                      </div>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleShowDetail(book)}
                      className="flex items-center justify-center gap-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 px-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm font-semibold"
                      title="Ver detalles"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="hidden sm:inline">Ver</span>
                    </button>
                    <button
                      onClick={() => handleOpenModal(book)}
                      className="flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm font-semibold"
                      title="Editar libro"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="hidden sm:inline">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(book)}
                      className="flex items-center justify-center gap-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-2 px-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm font-semibold"
                      title="Eliminar libro"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="hidden sm:inline">Borrar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.type === 'delete' ? 'Eliminar' : confirmModal.type === 'logout' ? 'Cerrar Sesión' : 'Confirmar'}
        cancelText="Cancelar"
        confirmButtonColor={confirmModal.type === 'delete' ? 'red' : confirmModal.type === 'logout' ? 'yellow' : 'blue'}
        icon={confirmModal.type === 'delete' ? 'delete' : confirmModal.type === 'logout' ? 'warning' : 'info'}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingBook ? '✏️ Editar Libro' : '📚 Nuevo Libro'}
                  </h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Información Principal */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-600 rounded-full"></span>
                  Información Principal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="flex items-center gap-1">
                        Título <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Cien años de soledad"
                      className="input-field w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="flex items-center gap-1">
                        Autor <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Gabriel García Márquez"
                      className="input-field w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="flex items-center gap-1">
                        ISBN <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: 978-3-16-148410-0"
                      className="input-field w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={formData.isbn}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Detalles de Publicación */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-600 rounded-full"></span>
                  Detalles de Publicación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="flex items-center gap-1">
                        Año <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1000"
                      max={new Date().getFullYear() + 10}
                      placeholder={new Date().getFullYear().toString()}
                      className="input-field w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={formData.published_year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published_year: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Editorial
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Penguin Random House"
                      className="input-field w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={formData.editorial}
                      onChange={(e) =>
                        setFormData({ ...formData, editorial: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Páginas
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Ej: 432"
                      className="input-field w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={formData.pages || ''}
                      onChange={(e) =>
                        setFormData({ 
                          ...formData, 
                          pages: e.target.value ? parseInt(e.target.value) : undefined 
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Clasificación */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-600 rounded-full"></span>
                  Clasificación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Género
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Ficción, Novela, Ciencia ficción"
                      className="input-field w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={formData.genre}
                      onChange={(e) =>
                        setFormData({ ...formData, genre: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Idioma
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Español, Inglés, Francés"
                      className="input-field w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      value={formData.language}
                      onChange={(e) =>
                        setFormData({ ...formData, language: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Footer con botones */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {editingBook ? '💾 Actualizar Libro' : '✨ Crear Libro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 border-2 border-gray-200 dark:border-gray-700 animate-slideUp">
            {/* Header del modal */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 -mx-6 -mt-6 px-6 py-5 rounded-t-2xl mb-6 z-10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white">
                      Detalle del Libro
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">Información completa</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseDetailModal}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Título del libro destacado */}
            <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedBook.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                por {selectedBook.author}
              </p>
            </div>

            {/* Grid de información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  ID
                </div>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">#{selectedBook.id}</p>
              </div>

              <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Año de Publicación
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedBook.published_year}</p>
              </div>

              <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl md:col-span-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  ISBN
                </div>
                <p className="text-xl font-mono font-bold text-gray-900 dark:text-white">{selectedBook.isbn}</p>
              </div>

              {selectedBook.genre && (
                <div className="space-y-2 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Género
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedBook.genre}</p>
                </div>
              )}

              {selectedBook.editorial && (
                <div className="space-y-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Editorial
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedBook.editorial}</p>
                </div>
              )}

              {selectedBook.language && (
                <div className="space-y-2 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Idioma
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedBook.language}</p>
                </div>
              )}

              {selectedBook.pages && (
                <div className="space-y-2 p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Páginas
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedBook.pages} páginas</p>
                </div>
              )}

              {selectedBook.created_at && (
                <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Fecha de Creación
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(selectedBook.created_at)}</p>
                </div>
              )}

              {selectedBook.updated_at && (
                <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Última Actualización
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(selectedBook.updated_at)}</p>
                </div>
              )}
            </div>

            {/* Footer con botones */}
            <div className="flex gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  handleCloseDetailModal();
                  handleOpenModal(selectedBook);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar Libro
              </button>
              <button
                onClick={handleCloseDetailModal}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Token Info Modal */}
      {showTokenInfo && tokenInfo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 border-2 border-gray-200 dark:border-gray-700 animate-slideUp">
            {/* Header del modal */}
            <div className="sticky top-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 -mx-6 -mt-6 px-6 py-5 rounded-t-2xl mb-6 z-10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white">
                      🔐 Información del Token JWT
                    </h2>
                    <p className="text-green-100 text-sm mt-1">Detalles de autenticación y sesión</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTokenInfo(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Estado del token */}
            <div className={`mb-6 p-6 rounded-xl border-l-4 ${
              tokenInfo.isExpired 
                ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-600' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-600'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {tokenInfo.isExpired ? (
                  <>
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h3 className="text-2xl font-bold text-red-600">Token Expirado</h3>
                      <p className="text-red-700 dark:text-red-400">La sesión ha caducado</p>
                    </div>
                  </>
                ) : (
                  <>
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-2xl font-bold text-green-600">Token Activo</h3>
                      <p className="text-green-700 dark:text-green-400">La sesión está vigente</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tiempo restante */}
            {!tokenInfo.isExpired && (
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-l-4 border-blue-600">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tiempo Restante</h3>
                </div>
                <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {tokenInfo.timeRemaining}
                </p>
              </div>
            )}

            {/* Información del token */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              {/* Fecha de expiración */}
              {tokenInfo.expiresAt && (
                <div className="space-y-2 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Fecha de Expiración
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {new Date(tokenInfo.expiresAt).toLocaleString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })}
                  </p>
                </div>
              )}

              {/* Datos decodificados del token */}
              {tokenInfo.decoded && (
                <div className="space-y-2 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Datos del Payload (Decodificado)
                  </div>
                  <div className="space-y-2">
                    {tokenInfo.decoded.sub && (
                      <div className="flex justify-between items-center py-2 border-b border-orange-200 dark:border-orange-800">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Subject (sub):</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{tokenInfo.decoded.sub}</span>
                      </div>
                    )}
                    {tokenInfo.decoded.iat && (
                      <div className="flex justify-between items-center py-2 border-b border-orange-200 dark:border-orange-800">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Emitido en (iat):</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {new Date(tokenInfo.decoded.iat * 1000).toLocaleString('es-ES')}
                        </span>
                      </div>
                    )}
                    {tokenInfo.decoded.exp && (
                      <div className="flex justify-between items-center py-2 border-b border-orange-200 dark:border-orange-800">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Expira en (exp):</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {new Date(tokenInfo.decoded.exp * 1000).toLocaleString('es-ES')}
                        </span>
                      </div>
                    )}
                    {tokenInfo.decoded.identity && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Identidad:</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{tokenInfo.decoded.identity}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Token completo (oculto por defecto, con opción de copiar) */}
              <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Token JWT Completo
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(tokenInfo.token);
                      alert('Token copiado al portapapeles');
                    }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar
                  </button>
                </div>
                <div className="bg-gray-900 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto">
                  <code className="text-xs text-green-400 font-mono break-all">
                    {tokenInfo.token}
                  </code>
                </div>
              </div>
            </div>

            {/* Footer con botón */}
            <div className="flex gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowTokenInfo(false)}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
