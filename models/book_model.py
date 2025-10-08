from typing import Optional, Dict, Any
from datetime import datetime
from models.db import db

class Book(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    published_year = db.Column(db.Integer, nullable=True)
    editorial = db.Column(db.String(200), nullable=True)
    genre = db.Column(db.String(100), nullable=True)
    language = db.Column(db.String(50), nullable=True)
    pages = db.Column(db.Integer, nullable=True)
    isbn = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, title: str, author: str, published_year: Optional[int] = None, editorial: Optional[str] = None, genre: Optional[str] = None, language: Optional[str] = None, pages: Optional[int] = None, isbn: Optional[str] = None):
        self.title = title
        self.author = author
        self.published_year = published_year
        self.editorial = editorial
        self.genre = genre
        self.language = language
        self.pages = pages
        self.isbn = isbn
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "published_year": self.published_year,
            "editorial": self.editorial,
            "genre": self.genre,
            "language": self.language,
            "pages": self.pages,
            "isbn": self.isbn,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

    def update(self, title: Optional[str] = None, author: Optional[str] = None, published_year: Optional[int] = None, editorial: Optional[str] = None, genre: Optional[str] = None, language: Optional[str] = None, pages: Optional[int] = None, isbn: Optional[str] = None):
        if title is not None:
            self.title = title
        if author is not None:
            self.author = author
        if published_year is not None:
            self.published_year = published_year
        if editorial is not None:
            self.editorial = editorial
        if genre is not None:
            self.genre = genre
        if language is not None:
            self.language = language
        if pages is not None:
            self.pages = pages
        if isbn is not None:
            self.isbn = isbn
        self.updated_at = datetime.utcnow()

    @staticmethod
    def validate_book_data(data: Dict[str, Any]) -> Optional[str]:
        if not data.get("title"):
            return "Title is required."
        if not data.get("author"):
            return "Author is required."
        if "published_year" in data:
            year = data["published_year"]
            if not isinstance(year, int):
                return "Published year must be an integer."
            if year < 1000 or year > datetime.now().year + 10:
                return f"Published year must be between 1000 and {datetime.now().year + 10}."
        if "editorial" in data and data["editorial"] is not None and not isinstance(data["editorial"], str):
            return "Editorial must be a string."
        if "genre" in data and data["genre"] is not None and not isinstance(data["genre"], str):
            return "Genre must be a string."
        if "language" in data and data["language"] is not None and not isinstance(data["language"], str):
            return "Language must be a string."
        if "pages" in data and data["pages"] is not None:
            if not isinstance(data["pages"], int):
                return "Pages must be an integer."
            if data["pages"] < 1:
                return "Pages must be greater than 0."
        if "isbn" in data and not isinstance(data["isbn"], str):
            return "ISBN must be a string."
        return None