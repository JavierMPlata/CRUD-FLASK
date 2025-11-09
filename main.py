from flask import Flask, jsonify
from flask_cors import CORS
import logging
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from datetime import timedelta

from controllers.book_controller import book_bp
from controllers.user_controller import user_bp
from models.db import db

# Cargar variables de entorno
load_dotenv()

# Configurar logging para mostrar peticiones HTTP
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s:%(name)s:%(message)s'
)

# Silenciar SQLAlchemy pero mantener werkzeug
logging.getLogger('sqlalchemy.engine').setLevel(logging.WARNING)
logging.getLogger('werkzeug').setLevel(logging.INFO)

app = Flask(__name__)

# Configurar CORS para permitir peticiones desde el frontend
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configuración de la aplicación
app.config['API_VERSION'] = '1.0.0'

# Configuración de base de datos
# Primero intentar con MySQL, luego SQLite como fallback
mysql_uri = os.getenv('MYSQL_URI')
if mysql_uri:
    try:
        app.config['SQLALCHEMY_DATABASE_URI'] = mysql_uri
        logging.info("Intentando conectar con MySQL...")
        # Verificar conexión MySQL con una prueba
        from sqlalchemy import create_engine
        test_engine = create_engine(mysql_uri)
        test_conn = test_engine.connect()
        test_conn.close()
        logging.info("✓ Usando configuración MySQL")
    except Exception as e:
        logging.warning(f"✗ MySQL connection failed: {e}")
        logging.info("✓ Cambiando a SQLite como fallback")
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books_users.db'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books_users.db'
    logging.info("✓ Usando configuración SQLite (no se configuró MYSQL_URI)")

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración JWT
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'tu_clave_secreta_jwt_super_segura')
# Configurar tiempo de expiración del token a 1 hora
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(seconds=3600)

# Inicializar extensiones
db.init_app(app)
jwt = JWTManager(app)

# Manejadores de errores JWT
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'error': 'Token expirado',
        'message': 'El token JWT ha expirado. Por favor, inicia sesión nuevamente.'
    }), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        'error': 'Token inválido',
        'message': 'El token JWT proporcionado es inválido.'
    }), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        'error': 'Token requerido',
        'message': 'Se requiere un token JWT para acceder a este endpoint. Usa: Authorization: Bearer <token>'
    }), 401

@jwt.needs_fresh_token_loader
def token_not_fresh_callback(jwt_header, jwt_payload):
    return jsonify({
        'error': 'Token no fresco',
        'message': 'Se requiere un token JWT fresco para esta operación.'
    }), 401

@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'error': 'Token revocado',
        'message': 'El token JWT ha sido revocado.'
    }), 401

# Registrar blueprints
app.register_blueprint(book_bp, url_prefix='/app')
app.register_blueprint(user_bp, url_prefix='/auth')

@app.route('/')
def index():
    return {
        "message": "API de Libros y Usuarios - CRUD Flask",
        "version": app.config.get('API_VERSION'),
        "endpoints": {
            "books": {
                "GET /app/books": "Obtener todos los libros (requiere JWT)",
                "GET /app/books/<id>": "Obtener un libro por ID (requiere JWT)",
                "POST /app/books": "Crear un nuevo libro (requiere JWT)",
                "PUT /app/books/<id>": "Actualizar un libro (requiere JWT)",
                "DELETE /app/books/<id>": "Eliminar un libro (requiere JWT)"
            },
            "authentication": {
                "POST /auth/register": "Registrar nuevo usuario",
                "POST /auth/login": "Iniciar sesión y obtener token JWT",
                "GET /auth/profile": "Obtener perfil usuario (requiere JWT)",
                "GET /auth/users": "Listar usuarios (requiere JWT)"
            }
        }, 
        "workflow": {
            "1": "Registra un usuario con POST /auth/register",
            "2": "Inicia sesión con POST /auth/login para obtener el token JWT",
            "3": "Usa el token en el header Authorization para acceder a los libros",
            "4": "Realiza operaciones CRUD en libros con el token"
        }
    }

# Crear tablas si no existen
def create_tables():
    """Crear todas las tablas definidas en los modelos"""
    with app.app_context():
        db.create_all()
        logging.info("Tablas de base de datos creadas/verificadas")

# Crear las tablas al inicializar
create_tables()

if __name__ == '__main__':
    app.run(debug=True)