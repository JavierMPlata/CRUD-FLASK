from models.book_model import Book
from sqlalchemy.orm import Session

class BookRepository:
    # Repositorio para manejar las operaciones CRUD de los libros
    def __init__(self, db_session: Session):
        self.db_session = db_session

    # Obtener todos los libros
    def get_all_books(self):
        return self.db_session.query(Book).all()
    
    # Obtener un libro por su ID
    def get_book_by_id(self, book_id: int):
        return self.db_session.query(Book).filter(Book.id == book_id).first()

    # Crear un nuevo libro
    def create_book(self, book_data: dict):
        # Remove 'id' from book_data if it exists to let the database auto-generate it
        book_data_copy = book_data.copy()
        book_data_copy.pop('id', None)
        
        new_book = Book(**book_data_copy)
        self.db_session.add(new_book)
        self.db_session.commit()
        self.db_session.refresh(new_book)
        return new_book

    # Actualizar un libro existente
    def update_book(self, book_id: int, book_data: dict):
        book = self.get_book_by_id(book_id)
        if book:
            book.update(**book_data)
            self.db_session.commit()
            self.db_session.refresh(book)
        return book

    # Eliminar un libro
    def delete_book(self, book_id: int):
        book = self.get_book_by_id(book_id)
        if book:
            self.db_session.delete(book)
            self.db_session.commit()
        return book