# Controladores (Controllers)

Este módulo maneja las rutas HTTP y la lógica de presentación para las operaciones CRUD de libros y gestión de usuarios en la aplicación Flask.

## Controladores Disponibles

### 1. Book Controller (`book_controller.py`)
Maneja las operaciones CRUD para libros con autenticación JWT requerida.

### 2. User Controller (`user_controller.py`) 
Maneja el registro, autenticación y gestión de usuarios con tokens JWT.

## Arquitectura del Controlador

### Patrón Blueprint
- Utiliza Flask Blueprint para organizar las rutas de manera modular
- `book_bp`: Blueprint para operaciones relacionadas con libros
- `user_bp`: Blueprint para operaciones relacionadas con usuarios  
- Permite registrar rutas de forma separada del objeto principal de Flask

### Separación de Responsabilidades
- **Controlador**: Maneja HTTP requests/responses, validación de entrada y autenticación
- **Servicio**: Delegación de lógica de negocio a servicios específicos
- **Modelo**: Validación de datos usando métodos de los modelos

### Autenticación y Seguridad
- **JWT (JSON Web Tokens)**: Autenticación basada en tokens para endpoints protegidos
- **Flask-JWT-Extended**: Manejo avanzado de JWT con decoradores
- **Logging**: Sistema de logging detallado para auditoría y debugging

## Componentes del Módulo

### Importaciones Comunes
```python
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from services.book_service import BookService
from services.user_service import UserService
from config.database import get_db_session
from models.book_model import Book
from models.user_model import User
import logging
```

### Sistema de Logging
- Logger específico por controlador usando `logging.getLogger(__name__)`
- Logs detallados para auditoría y debugging
- Registro de operaciones exitosas y errores

## Book Controller - Endpoints Disponibles

### Inicialización
```python
book_bp = Blueprint('book_bp', __name__)
```

### 1. GET `/books` - Obtener Todos los Libros
```python
@book_bp.route('/books', methods=['GET'])
@jwt_required()
def get_books():
```

**Funcionalidad:**
- **Autenticación**: Requiere token JWT válido
- Obtiene todos los libros de la base de datos
- Registra la identidad del usuario que hace la consulta
- Retorna lista JSON con conteo total

**Headers Requeridos:**
```
Authorization: Bearer <jwt_token>
```

**Respuesta:**
```json
{
    "books": [
        {
            "id": 1,
            "title": "Título del libro",
            "author": "Autor"
        }
    ],
    "total": 1
}
```

### 2. GET `/books/<int:book_id>` - Obtener Libro por ID
```python
@book_bp.route('/books/<int:book_id>', methods=['GET'])
@jwt_required()
def get_book(book_id):
```

**Funcionalidad:**
- **Autenticación**: Requiere token JWT válido
- Busca un libro específico por su ID
- Logs detallados de la operación
- Respuesta estructurada con mensaje y datos

**Respuestas:**
- **200**: Libro encontrado con mensaje descriptivo
- **401**: Token inválido o faltante  
- **404**: Libro no encontrado
- **500**: Error interno del servidor

### 3. POST `/books` - Crear Nuevo Libro
```python
@book_bp.route('/books', methods=['POST'])
@jwt_required()
def create_book():
```

**Funcionalidad:**
- **Autenticación**: Requiere token JWT válido
- Valida datos usando `Book.validate_book_data()`
- Crea nuevo libro a través del servicio
- Logging completo de la operación

**Validaciones:**
- Estructura de datos requerida
- Tipos de datos correctos
- Campos obligatorios

### 4. PUT `/books/<int:book_id>` - Actualizar Libro
```python
@book_bp.route('/books/<int:book_id>', methods=['PUT'])
@jwt_required()
def update_book(book_id):
```

**Funcionalidad:**
- **Autenticación**: Requiere token JWT válido
- Actualiza un libro existente
- Valida datos de entrada
- Verifica existencia del libro

### 5. DELETE `/books/<int:book_id>` - Eliminar Libro
```python
@book_bp.route('/books/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_book(book_id):
```

**Funcionalidad:**
- **Autenticación**: Requiere token JWT válido
- Elimina un libro por su ID
- Verifica existencia antes de eliminar
- Logging de la operación de eliminación

## User Controller - Endpoints Disponibles

### Inicialización
```python
user_bp = Blueprint('user_bp', __name__)
```

### 1. POST `/register` - Registro de Usuario
```python
@user_bp.route('/register', methods=['POST'])
def register():
```

**Funcionalidad:**
- **Sin autenticación**: Endpoint público para registro
- Valida datos usando `User.validate_user_data()`
- Verifica si el usuario ya existe
- Registra nuevo usuario

**JSON Esperado:**
```json
{
    "username": "usuario123",
    "password": "contraseña123"
}
```

**Respuestas:**
- **201**: Usuario creado exitosamente
- **400**: Datos inválidos
- **409**: Usuario ya existe
- **500**: Error interno

### 2. POST `/login` - Autenticación de Usuario
```python
@user_bp.route('/login', methods=['POST'])
def login():
```

**Funcionalidad:**
- **Sin autenticación**: Endpoint público para login
- Valida credenciales del usuario
- Genera token JWT en caso de éxito
- Logging de intentos de login

**JSON Esperado:**
```json
{
    "username": "usuario123",
    "password": "contraseña123"
}
```

**Respuesta Exitosa:**
```json
{
    "message": "Login exitoso",
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
        "id": 1,
        "username": "usuario123"
    }
}
```

## Características del Diseño

### 1. Autenticación JWT
- **Flask-JWT-Extended**: Implementación robusta de autenticación JWT
- **Decorador `@jwt_required()`**: Protege endpoints sensibles
- **`get_jwt_identity()`**: Obtiene la identidad del usuario autenticado
- **Tokens de acceso**: Generación automática en login exitoso

### 2. Validación Centralizada
- Utiliza métodos de validación de los modelos (`Book.validate_book_data()`, `User.validate_user_data()`)
- Validación consistente en operaciones POST y PUT
- Manejo de errores estandarizado

### 3. Códigos de Estado HTTP Apropiados
- **200**: Operación exitosa
- **201**: Recurso creado
- **400**: Error del cliente (validación)
- **401**: No autorizado (JWT inválido/faltante)
- **404**: Recurso no encontrado
- **409**: Conflicto (usuario ya existe)
- **500**: Error interno del servidor

### 4. Formato JSON Estandarizado
- Todas las respuestas en formato JSON
- Uso de `to_dict()` para serialización consistente
- Mensajes de error descriptivos con detalles cuando es apropiado
- Estructura consistente de respuestas

### 5. Sistema de Logging Avanzado
- Logger específico por controlador
- Logs informativos para operaciones exitosas
- Logs de warning para situaciones anómalas
- Logs de error con stack trace completo
- Registro de identidad de usuario para auditoría

### 6. Delegación a Servicios
- Los controladores no contienen lógica de negocio
- Todas las operaciones delegadas a servicios específicos
- Mantenimiento de principio de responsabilidad única
- Creación de nuevas sesiones por operación

### 7. Manejo Robusto de Errores
- Try-catch completo en todas las operaciones
- Logging detallado de errores
- Respuestas de error estructuradas
- Diferenciación entre errores de usuario y del sistema

## Manejo de Errores

### Errores de Autenticación (401)
```json
{
    "msg": "Missing Authorization Header"
}
```

### Errores de Validación (400)
```json
{
    "error": "Username y password son requeridos"
}
```

### Conflictos (409)
```json
{
    "error": "Usuario ya existe"
}
```

### Recurso No Encontrado (404)
```json
{
    "error": "Libro no encontrado"
}
```

### Errores Internos (500)
```json
{
    "error": "Error al obtener libros",
    "detail": "Descripción técnica del error"
}
```

### Operación Exitosa con Datos
```json
{
    "message": "Libro encontrado",
    "book": {
        "id": 1,
        "title": "Título del libro"
    }
}
```

## Uso de los Blueprints

Para registrar los Blueprints en la aplicación principal:

```python
from controllers.book_controller import book_bp
from controllers.user_controller import user_bp

app.register_blueprint(user_bp, url_prefix='/api/auth')
app.register_blueprint(book_bp, url_prefix='/api')
```

### Rutas disponibles:

**Autenticación:**
- `POST /api/auth/register`
- `POST /api/auth/login`

**Libros (requieren JWT):**
- `GET /api/books`
- `POST /api/books`
- `GET /api/books/<id>`
- `PUT /api/books/<id>`
- `DELETE /api/books/<id>`

## Estructura de Archivos de la Carpeta Controllers

```
controllers/
├── __init__.py              # Marca el directorio como paquete Python
├── book_controller.py       # Controlador para operaciones CRUD de libros
├── user_controller.py       # Controlador para autenticación y usuarios
└── README_Controller.md     # Esta documentación
```

## Flujo de Autenticación

1. **Registro**: Usuario se registra con `POST /api/auth/register`
2. **Login**: Usuario obtiene JWT con `POST /api/auth/login`
3. **Acceso**: Usuario incluye JWT en header `Authorization: Bearer <token>`
4. **Validación**: Cada endpoint protegido valida el JWT automáticamente
5. **Identificación**: Se obtiene la identidad del usuario para logging y auditoría

## Ventajas de esta Implementación

1. **Seguridad**: Autenticación JWT robusta en endpoints sensibles
2. **Modularidad**: Blueprints permiten organización clara y separación
3. **Auditabilidad**: Logging detallado de todas las operaciones
4. **Reutilización**: Fácil integración en diferentes aplicaciones
5. **Mantenibilidad**: Separación clara de responsabilidades
6. **Testabilidad**: Funciones independientes fáciles de testear
7. **Escalabilidad**: Fácil agregar nuevos endpoints y controladores
8. **Consistencia**: Formato estándar de respuestas y manejo de errores
9. **Robustez**: Manejo completo de errores y situaciones excepcionales
10. **Trazabilidad**: Identificación de usuarios en logs para auditoría