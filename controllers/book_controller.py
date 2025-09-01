from flask import Blueprint, jsonify, request
from services.book_service import (
    get_all_books,
    get_book_by_id,
    create_book,
    update_book,
    delete_book
)

book_controller = Blueprint("book_controller", __name__)

@book_controller.route("/books", methods=["GET"])
def get_books():
    try:
        books = get_all_books()
        return jsonify(books)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@book_controller.route("/books/<int:book_id>", methods=["GET"])
def get_book(book_id):
    try:
        book = get_book_by_id(book_id)
        if book is None:
            return jsonify({"error": "Book not found"}), 404
        return jsonify(book)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@book_controller.route("/books", methods=["POST"])
def create_new_book():
    try:
        if not request.json:
            return jsonify({"error": "No JSON data provided"}), 400
            
        book_data = request.json
        new_book = create_book(book_data)
        
        if "error" in new_book:
            return jsonify(new_book), 400
            
        return jsonify(new_book), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@book_controller.route("/books/<int:book_id>", methods=["PUT"])
def update_existing_book(book_id):
    try:
        if not request.json:
            return jsonify({"error": "No JSON data provided"}), 400
            
        updated_data = request.json
        updated_book = update_book(book_id, updated_data)
        
        if "error" in updated_book:
            return jsonify(updated_book), 400
            
        return jsonify(updated_book)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@book_controller.route("/books/<int:book_id>", methods=["DELETE"])
def delete_existing_book(book_id):
    try:
        success = delete_book(book_id)
        if not success:
            return jsonify({"error": "Book not found"}), 404
        return jsonify({"success": success, "message": "Book deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
