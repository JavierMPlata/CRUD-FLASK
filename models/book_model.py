from typing import Optional, Dict, Any
from datetime import datetime
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    author = Column(String(100), nullable=False)
    published_date = Column(String(100), nullable=True)
    editorials = Column(String(100), nullable=True)
    gender = Column(String(100), nullable=True)
    language = Column(String(100), nullable=True)
    pages = Column(String(100), nullable=True)
    isbn = Column(String(100), nullable=True)


    def __init__(self, title: str, author: str, published_date: Optional[str] = None, editorials: Optional[str] = None, gender: Optional[str] = None, language: Optional[str] = None, pages: Optional[str] = None, isbn: Optional[str] = None):
        self.title = title
        self.author = author
        self.published_date = self._parse_date(published_date) if published_date else datetime.now()
        self.editorials = editorials
        self.gender = gender
        self.language = language
        self.pages = pages
        self.isbn = isbn

    def _parse_date(self, date_str: str) -> datetime:
        """Parse date string to datetime object"""
        try:
            return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        except (ValueError, AttributeError):
            try:
                return datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                return datetime.now()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "published_date": self.published_date if isinstance(self.published_date, str) else self.published_date.isoformat(),
            "editorials": self.editorials,
            "gender": self.gender,
            "language": self.language,
            "pages": self.pages,
            "isbn": self.isbn
        }

    def update(self, title: Optional[str] = None, author: Optional[str] = None, published_date: Optional[str] = None, editorials: Optional[str] = None, gender: Optional[str] = None, language: Optional[str] = None, pages: Optional[str] = None, isbn: Optional[str] = None):
        if title is not None:
            self.title = title
        if author is not None:
            self.author = author
        if published_date is not None:
            self.published_date = self._parse_date(published_date)
        if editorials is not None:
            self.editorials = editorials
        if gender is not None:
            self.gender = gender
        if language is not None:
            self.language = language
        if pages is not None:
            self.pages = pages
        if isbn is not None:
            self.isbn = isbn

    @staticmethod
    def validate_book_data(data: Dict[str, Any]) -> Optional[str]:
        if not data.get("title"):
            return "Title is required."
        if not data.get("author"):
            return "Author is required."
        if "published_date" in data and not isinstance(data["published_date"], str):
            return "Published date must be a string."
        if "editorials" in data and not isinstance(data["editorials"], str):
            return "Editorials must be a string."
        if "gender" in data and not isinstance(data["gender"], str):
            return "Gender must be a string."
        if "language" in data and not isinstance(data["language"], str):
            return "Language must be a string."
        if "pages" in data and not isinstance(data["pages"], str):
            return "Pages must be a string."
        if "isbn" in data and not isinstance(data["isbn"], str):
            return "ISBN must be a string."
        return None