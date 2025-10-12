'use client';

interface ErrorPageProps {
  title?: string;
  message?: string;
  statusCode?: number;
  showRetry?: boolean;
  onRetry?: () => void;
  showHome?: boolean;
}

export default function ErrorPage({
  title = 'Algo salió mal',
  message = 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.',
  statusCode,
  showRetry = true,
  onRetry,
  showHome = true,
}: ErrorPageProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-red-900 dark:to-pink-900 px-4 py-8 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-400/20 to-red-600/20 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Icono de error */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-red-600 to-pink-600 p-8 rounded-full shadow-2xl">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Código de estado (si se proporciona) */}
        {statusCode && (
          <div className="text-8xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-gradient mb-4">
            {statusCode}
          </div>
        )}

        {/* Título y mensaje */}
        <div className="space-y-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-gradient">
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto">
            {message}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          {showRetry && (
            <button
              onClick={handleRetry}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Intentar de nuevo</span>
            </button>
          )}
          
          {showHome && (
            <button
              onClick={handleGoHome}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Ir al inicio</span>
            </button>
          )}
        </div>

        {/* Información adicional */}
        <div className="pt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Si el problema persiste, por favor contacta al administrador.</p>
        </div>
      </div>
    </div>
  );
}