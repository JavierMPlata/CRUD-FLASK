from flask import Flask
from controllers.book_controller import book_bp

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