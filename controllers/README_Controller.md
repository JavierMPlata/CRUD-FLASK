# Controladores (Controllers)

Este módulo (`book_controller.py`) maneja las rutas HTTP y la lógica de presentación para las operaciones CRUD de libros en la aplicación Flask.

## Arquitectura del Controlador

### Patrón Blueprint
- Utiliza Flask Blueprint para organizar las rutas de manera modular
- Blueprint nombrado como `book_bp` para operaciones relacionadas con libros
- Permite registrar rutas de forma separada del objeto principal de Flask

### Separación de Responsabilidades
- **Controlador**: Maneja HTTP requests/responses y validación de entrada
- **Servicio**: Delegación de lógica de negocio a `BookService`
- **Modelo**: Validación de datos usando métodos del modelo `Book`

## Componentes del Módulo

### Importaciones
```python
from flask import Blueprint, request, jsonify
from services.book_service import BookService
from config.database import get_db_session
from models.book_model import Book
```

### Inicialización
```python
service = BookService(get_db_session())
book_bp = Blueprint('book_bp', __name__)
```

- Crea una instancia del servicio con una sesión de base de datos
- Define el Blueprint para agrupar las rutas relacionadas

## Endpoints Disponibles

### 1. GET `/books` - Obtener Todos los Libros
```python
@book_bp.route('/books', methods=['GET'])
def get_books():
```

**Funcionalidad:**
- Obtiene todos los libros de la base de datos
- Convierte cada libro a diccionario usando `to_dict()`
- Retorna lista JSON con código 200

**Respuesta:**
```json
[
    {
        "id": 1,
        "title": "Título del libro",
        "author": "Autor",
        "published_year": 2023,
        "genre": "Ficción"
    }
]
```

### 2. GET `/books/<int:book_id>` - Obtener Libro por ID
```python
@book_bp.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
```

**Funcionalidad:**
- Busca un libro específico por su ID
- Valida existencia del libro
- Retorna el libro o error 404

**Respuestas:**
- **200**: Libro encontrado
- **404**: Libro no encontrado

### 3. POST `/books` - Crear Nuevo Libro
```python
@book_bp.route('/books', methods=['POST'])
def create_book():
```

**Funcionalidad:**
- Recibe datos JSON del request
- Valida datos usando `Book.validate_book_data()`
- Crea nuevo libro a través del servicio
- Retorna libro creado con código 201

**Validaciones:**
- Estructura de datos requerida
- Tipos de datos correctos
- Campos obligatorios

**Respuestas:**
- **201**: Libro creado exitosamente
- **400**: Error de validación

### 4. PUT `/books/<int:book_id>` - Actualizar Libro
```python
@book_bp.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
```

**Funcionalidad:**
- Actualiza un libro existente
- Valida datos de entrada
- Verifica existencia del libro
- Retorna libro actualizado

**Respuestas:**
- **200**: Libro actualizado exitosamente
- **400**: Error de validación
- **404**: Libro no encontrado

### 5. DELETE `/books/<int:book_id>` - Eliminar Libro
```python
@book_bp.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
```

**Funcionalidad:**
- Elimina un libro por su ID
- Verifica existencia antes de eliminar
- Retorna confirmación de eliminación

**Respuestas:**
- **200**: Libro eliminado exitosamente
- **404**: Libro no encontrado

## Características del Diseño

### 1. Validación Centralizada
- Utiliza el método `Book.validate_book_data()` del modelo
- Validación consistente en operaciones POST y PUT
- Manejo de errores estandarizado

### 2. Códigos de Estado HTTP Apropiados
- **200**: Operación exitosa
- **201**: Recurso creado
- **400**: Error del cliente (validación)
- **404**: Recurso no encontrado

### 3. Formato JSON Estandarizado
- Todas las respuestas en formato JSON
- Uso de `to_dict()` para serialización consistente
- Mensajes de error descriptivos

### 4. Delegación a Servicios
- El controlador no contiene lógica de negocio
- Todas las operaciones delegadas a `BookService`
- Mantenimiento de principio de responsabilidad única

## Manejo de Errores

### Errores de Validación (400)
```json
{
    "error": "Mensaje descriptivo del error de validación"
}
```

### Recurso No Encontrado (404)
```json
{
    "error": "Book not found"
}
```

### Eliminación Exitosa (200)
```json
{
    "message": "Book deleted"
}
```

## Uso del Blueprint

Para registrar el Blueprint en la aplicación principal:

```python
from controllers.book_controller import book_bp

app.register_blueprint(book_bp, url_prefix='/api')
```

Esto hace que todas las rutas estén disponibles bajo el prefijo `/api`:
- `GET /api/books`
- `POST /api/books`
- `GET /api/books/1`
- `PUT /api/books/1`
- `DELETE /api/books/1`

## Ventajas de esta Implementación

1. **Modularidad**: Blueprint permite organización clara
2. **Reutilización**: Fácil integración en diferentes aplicaciones
3. **Mantenibilidad**: Separación clara de responsabilidades
4. **Testabilidad**: Funciones independientes fáciles de testear
5. **Escalabilidad**: Fácil agregar nuevos endpoints
6. **Consistencia**: Formato estándar de respuestas y errores