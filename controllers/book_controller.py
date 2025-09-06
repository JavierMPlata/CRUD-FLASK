from flask import Blueprint, request, jsonify
from services.book_service import BookService
from config.database import get_db_session
from models.book_model import Book

# Importar el modelo Book para validación
service = BookService(get_db_session())

# Crear un Blueprint para las rutas de libros
book_bp = Blueprint('book_bp', __name__)

# Definir las rutas para las operaciones CRUD de libros
@book_bp.route('/books', methods=['GET'])
def get_books():
    books = service.get_all_books()
    return jsonify([book.to_dict() for book in books]), 200

@book_bp.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = service.get_book_by_id(book_id)
    if book:
        return jsonify(book.to_dict()), 200
    return jsonify({"error": "Book not found"}), 404

@book_bp.route('/books', methods=['POST'])
def create_book():
    data = request.json
    error = Book.validate_book_data(data)
    if error:
        return jsonify({"error": error}), 400
    new_book = service.create_book(data)
    return jsonify(new_book.to_dict()), 201

@book_bp.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.json
    error = Book.validate_book_data(data)
    if error:
        return jsonify({"error": error}), 400
    updated_book = service.update_book(book_id, data)
    if updated_book:
        return jsonify(updated_book.to_dict()), 200
    return jsonify({"error": "Book not found"}), 404

@book_bp.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    deleted_book = service.delete_book(book_id)
    if deleted_book:
        return jsonify({"message": "Book deleted"}), 200
    return jsonify({"error": "Book not found"}), 404    

