from datetime import datetime
from typing import Dict, Any, Optional

class Book:
    def __init__(self, id: int, title: str, author: str, published_date: Optional[str] = None):
        self.id = id
        self.title = title
        self.author = author
        self.published_date = self._parse_date(published_date) if published_date else datetime.now()

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
            "published_date": self.published_date.isoformat()
        }
    
    def update(self, title: Optional[str] = None, author: Optional[str] = None, published_date: Optional[str] = None):
        if title is not None:
            self.title = title
        if author is not None:
            self.author = author
        if published_date is not None:
            self.published_date = self._parse_date(published_date)

    @staticmethod
    def validate_book_data(data: Dict[str, Any]) -> Optional[str]:
        if not data.get("title"):
            return "Title is required."
        if not data.get("author"):
            return "Author is required."
        if "published_date" in data and not isinstance(data["published_date"], str):
            return "Published date must be a string."
        return None