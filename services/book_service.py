from repositories.book_repository import BookRepository
from models.book_model import Book
from sqlalchemy.orm import Session

class BookService:

    # Servicio para manejar la lógica de negocio relacionada con los libros
    def __init__(self, db_session: Session):
        self.book_repository = BookRepository(db_session)

    # Obtener todos los libros
    def get_all_books(self):
        return self.book_repository.get_all_books()
    
    # Obtener un libro por su ID
    def get_book_by_id(self, book_id: int):
        return self.book_repository.get_book_by_id(book_id)

    # Crear un nuevo libro
    def create_book(self, book_data: dict):
        return self.book_repository.create_book(book_data)
    
    # Actualizar un libro existente
    def update_book(self, book_id: int, book_data: dict):
        return self.book_repository.update_book(book_id, book_data)
    
    # Eliminar un libro
    def delete_book(self, book_id: int):
        return self.book_repository.delete_book(book_id)