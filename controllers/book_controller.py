from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.book_service import BookService
from config.database import get_db_session
from models.book_model import Book
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Crear un Blueprint para las rutas de libros
book_bp = Blueprint('book_bp', __name__)

# Definir las rutas para las operaciones CRUD de libros
@book_bp.route('/books', methods=['GET'])
@jwt_required()
def get_books():
    """
    Obtener todos los libros (requiere autenticación JWT)
    
    Headers:
        Authorization: Bearer <jwt_token>
    
    Returns:
        200: Lista de libros
        401: Token inválido o faltante
        500: Error interno
    """
    try:
        current_user_id = get_jwt_identity()
        logger.info(f'Consultando libros (usuario ID: {current_user_id})')
        
        # Crear servicio con nueva sesión
        service = BookService(get_db_session())
        books = service.get_all_books()
        
        logger.info(f'{len(books)} libros encontrados')
        return jsonify({
            'books': [book.to_dict() for book in books],
            'total': len(books)
        }), 200
        
    except Exception as e:
        logger.error(f'Error al consultar libros: {str(e)}')
        return jsonify({
            'error': 'Error al obtener libros', 
            'detail': str(e)
        }), 500

@book_bp.route('/books/<int:book_id>', methods=['GET'])
@jwt_required()
def get_book(book_id):
    """
    Obtener un libro por ID (requiere autenticación JWT)
    
    Headers:
        Authorization: Bearer <jwt_token>
    
    Returns:
        200: Libro encontrado
        401: Token inválido o faltante
        404: Libro no encontrado
        500: Error interno
    """
    try:
        current_user_id = get_jwt_identity()
        logger.info(f'Consultando libro ID {book_id} (usuario ID: {current_user_id})')
        
        # Crear servicio con nueva sesión
        service = BookService(get_db_session())
        book = service.get_book_by_id(book_id)
        
        if book:
            logger.info(f'Libro encontrado: {book.title}')
            return jsonify({
                'message': 'Libro encontrado',
                'book': book.to_dict()
            }), 200
        else:
            logger.warning(f'Libro no encontrado con ID: {book_id}')
            return jsonify({"error": "Libro no encontrado"}), 404
            
    except Exception as e:
        logger.error(f'Error al consultar libro: {str(e)}')
        return jsonify({
            'error': 'Error al obtener libro', 
            'detail': str(e)
        }), 500

@book_bp.route('/books', methods=['POST'])
@jwt_required()
def create_book():
    """
    Crear un nuevo libro (requiere autenticación JWT)
    
    Headers:
        Authorization: Bearer <jwt_token>
    
    Expected JSON:
    {
        "title": "El Quijote de la Mancha",
        "author": "Miguel de Cervantes",
        "published_year": 1605,
        "editorial": "Editorial Ejemplo",
        "genre": "Novela",
        "language": "Español",
        "pages": 863,
        "isbn": "978-84-376-0675-0"
    }
    
    Returns:
        201: Libro creado exitosamente
        400: Datos inválidos
        401: Token inválido o faltante
        500: Error interno
    """
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json() or {}
        
        logger.info(f'Creando libro (usuario ID: {current_user_id})')
        logger.info(f'Datos recibidos: {data}')
        
        # Validar datos
        error = Book.validate_book_data(data)
        if error:
            logger.warning(f'Datos inválidos para crear libro: {error}')
            return jsonify({"error": error}), 400
        
        # Crear servicio con nueva sesión
        service = BookService(get_db_session())
        new_book = service.create_book(data)
        
        logger.info(f'Libro creado exitosamente: {new_book.title} (ID: {new_book.id})')
        return jsonify({
            'message': 'Libro creado exitosamente',
            'book': new_book.to_dict()
        }), 201
        
    except Exception as e:
        logger.error(f'Error al crear libro: {str(e)}')
        return jsonify({
            'error': 'Error al crear libro', 
            'detail': str(e)
        }), 500

@book_bp.route('/books/<int:book_id>', methods=['PUT'])
@jwt_required()
def update_book(book_id):
    """
    Actualizar un libro existente (requiere autenticación JWT)
    
    Headers:
        Authorization: Bearer <jwt_token>
    
    Expected JSON:
    {
        "title": "Nuevo título",
        "author": "Nuevo autor",
        "published_year": 2024,
        "editorial": "Nueva Editorial",
        "genre": "Ficción",
        "language": "Inglés",
        "pages": 250,
        "isbn": "978-1-23456-789-0"
    }
    
    Returns:
        200: Libro actualizado exitosamente
        400: Datos inválidos
        401: Token inválido o faltante
        404: Libro no encontrado
        500: Error interno
    """
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json() or {}
        
        logger.info(f'Actualizando libro ID {book_id} (usuario ID: {current_user_id})')
        
        # Para actualización, no validamos campos requeridos (actualización parcial)
        # Solo validamos tipos de datos si están presentes
        if "published_year" in data and data["published_year"] is not None:
            if not isinstance(data["published_year"], int):
                return jsonify({"error": "Published year must be an integer."}), 400
            if data["published_year"] < 1000 or data["published_year"] > datetime.now().year + 10:
                return jsonify({"error": f"Published year must be between 1000 and {datetime.now().year + 10}."}), 400
        
        # Crear servicio con nueva sesión
        service = BookService(get_db_session())
        updated_book = service.update_book(book_id, data)
        
        if updated_book:
            logger.info(f'Libro actualizado exitosamente: {updated_book.title}')
            return jsonify({
                'message': 'Libro actualizado exitosamente',
                'book': updated_book.to_dict()
            }), 200
        else:
            logger.warning(f'Libro no encontrado para actualizar con ID: {book_id}')
            return jsonify({"error": "Libro no encontrado"}), 404
            
    except Exception as e:
        logger.error(f'Error al actualizar libro: {str(e)}')
        return jsonify({
            'error': 'Error al actualizar libro', 
            'detail': str(e)
        }), 500

@book_bp.route('/books/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_book(book_id):
    """
    Eliminar un libro (requiere autenticación JWT)
    
    Headers:
        Authorization: Bearer <jwt_token>
    
    Returns:
        200: Libro eliminado exitosamente
        401: Token inválido o faltante
        404: Libro no encontrado
        500: Error interno
    """
    try:
        current_user_id = get_jwt_identity()
        logger.info(f'Eliminando libro ID {book_id} (usuario ID: {current_user_id})')
        
        # Crear servicio con nueva sesión
        service = BookService(get_db_session())
        deleted_book = service.delete_book(book_id)
        
        if deleted_book:
            logger.info(f'Libro eliminado exitosamente: {deleted_book.title}')
            return jsonify({
                'message': 'Libro eliminado exitosamente',
                'deleted_book': deleted_book.to_dict()
            }), 200
        else:
            logger.warning(f'Libro no encontrado para eliminar con ID: {book_id}')
            return jsonify({"error": "Libro no encontrado"}), 404
            
    except Exception as e:
        logger.error(f'Error al eliminar libro: {str(e)}')
        return jsonify({
            'error': 'Error al eliminar libro', 
            'detail': str(e)
        }), 500    

