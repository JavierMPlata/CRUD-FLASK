import sys
import os
from pathlib import Path

# Agregar el directorio raíz del proyecto al path de Python
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from flask import Flask
from config.database import config
from controllers.book_controller import book_controller

def create_app(config_name=None):
    """Factory function to create Flask app"""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Registrar blueprints
    app.register_blueprint(book_controller, url_prefix='/app')
    
    # Ruta de bienvenida
    @app.route('/')
    def index():
        return {
            "message": "API de Libros - CRUD Flask",
            "version": app.config.get('API_VERSION'),
            "endpoints": {
                "GET /app/books": "Obtener todos los libros",
                "GET /app/books/<id>": "Obtener un libro por ID",
                "POST /app/books": "Crear un nuevo libro",
                "PUT /app/books/<id>": "Actualizar un libro",
                "DELETE /app/books/<id>": "Eliminar un libro"
            }
        }
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)