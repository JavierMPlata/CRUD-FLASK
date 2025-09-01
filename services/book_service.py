from typing import List, Optional, Dict, Any
from models.book import Book

class BookService:
    def __init__(self):
        self.books: List[Book] = []
        self.next_id = 1
        self._init_sample_data()


    def _init_sample_data(self):
        sample_books = [
            {
                "title": "1984",
                "author": "George Orwell",
                "published_date": "1949-06-08"
            },
            {
                "title": "To Kill a Mockingbird",
                "author": "Harper Lee",
                "published_date": "1960-07-11"
            },
            {
                "title": "The Great Gatsby",
                "author": "F. Scott Fitzgerald",
                "published_date": "1925-04-10"
            },
            {
                "title": "Moby Dick",
                "author": "Herman Melville",
                "published_date": "1851-10-18"
            },
            {
                "title": "War and Peace",
                "author": "Leo Tolstoy",
                "published_date": "1869-01-01"
            }
        ]

        for book_data in sample_books:
            self.create_book(book_data)

    def get_all_books(self) -> List[Dict[str, Any]]:
        return [book.to_dict() for book in self.books]

    def get_book_by_id(self, book_id: int) -> Optional[Dict[str, Any]]:
        for book in self.books:
            if book.id == book_id:
                return book.to_dict()
        return None

    def create_book(self, book_data: Dict[str, Any]) -> Dict[str, Any]:
        validation_error = Book.validate_book_data(book_data)
        if validation_error:
            return {"error": validation_error}

        new_book = Book(
            id=self.next_id,
            title=book_data.get("title"),
            author=book_data.get("author"),
            published_date=book_data.get("published_date")
        )

        self.books.append(new_book)
        self.next_id += 1
        return new_book.to_dict()

    def update_book(self, book_id: int, updated_data: Dict[str, Any]) -> Dict[str, Any]:
        # Buscar el libro objeto, no el diccionario
        book_obj = None
        for book in self.books:
            if book.id == book_id:
                book_obj = book
                break
        
        if not book_obj:
            return {"error": "Book not found"}

        validation_error = Book.validate_book_data(updated_data)
        if validation_error:
            return {"error": validation_error}

        # Usar el método update de la instancia Book
        book_obj.update(
            title=updated_data.get("title"),
            author=updated_data.get("author"),
            published_date=updated_data.get("published_date")
        )

        return book_obj.to_dict()

    def delete_book(self, book_id: int) -> bool:
        for i, book in enumerate(self.books):
            if book.id == book_id:
                del self.books[i]
                return True
        return False
    
# Crear una instancia global del servicio
book_service = BookService()

# Exportar las funciones como funciones independientes
def get_all_books() -> List[Dict[str, Any]]:
    return book_service.get_all_books()

def get_book_by_id(book_id: int) -> Optional[Dict[str, Any]]:
    return book_service.get_book_by_id(book_id)

def create_book(book_data: Dict[str, Any]) -> Dict[str, Any]:
    return book_service.create_book(book_data)

def update_book(book_id: int, updated_data: Dict[str, Any]) -> Dict[str, Any]:
    return book_service.update_book(book_id, updated_data)

def delete_book(book_id: int) -> bool:
    return book_service.delete_book(book_id)