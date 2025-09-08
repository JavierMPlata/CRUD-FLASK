from flask import Flask
import logging
from controllers.book_controller import book_bp

# Configurar logging para mostrar peticiones HTTP
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s:%(name)s:%(message)s'
)

# Silenciar SQLAlchemy pero mantener werkzeug
logging.getLogger('sqlalchemy.engine').setLevel(logging.WARNING)
logging.getLogger('werkzeug').setLevel(logging.INFO)

app = Flask(__name__)

# Configuración de la aplicación
app.config['API_VERSION'] = '1.0.0'

# Registrar el blueprint con prefijo /app
app.register_blueprint(book_bp, url_prefix='/app')

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

if __name__ == '__main__':
    app.run(debug=True)