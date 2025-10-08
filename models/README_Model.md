# Modelos (Models)

Este módulo define los modelos de datos para las entidades Book y User utilizando Flask-SQLAlchemy ORM. Representa la estructura de datos y las reglas de negocio para libros y usuarios en la aplicación.

## Modelos Disponibles

### 1. Book Model (`book_model.py`)
Modelo para la gestión de libros con validación, serialización y timestamps automáticos.

### 2. User Model (`user_model.py`)
Modelo para la gestión de usuarios con validación de credenciales y seguridad.

### 3. Database Configuration (`db.py`)
Configuración central de Flask-SQLAlchemy para la aplicación.

## Arquitectura del Modelo

### Flask-SQLAlchemy ORM
- Utiliza Flask-SQLAlchemy como ORM (Object-Relational Mapping)
- Hereda de `db.Model` para definición declarativa
- Mapeo automático entre objetos Python y tablas de base de datos
- Integración completa con Flask

### Características del Modelo
- **Validación de datos**: Métodos integrados para validar información
- **Serialización**: Conversión automática a diccionarios JSON
- **Timestamps automáticos**: created_at y updated_at gestionados automáticamente (Book)
- **Actualización parcial**: Método para updates selectivos (Book)
- **Seguridad**: Validación de credenciales y exclusión de passwords (User)
- **Logging**: Sistema de logging integrado para auditoría

## Configuración de Base de Datos (`db.py`)

### Importaciones
```python
from flask_sqlalchemy import SQLAlchemy
```

### Instancia Global
```python
db = SQLAlchemy()
```

**Funcionalidad:**
- Instancia central de Flask-SQLAlchemy
- Será inicializada por la aplicación Flask principal
- Proporciona acceso a Column, Integer, String, etc.
- Maneja la conexión y sesiones de base de datos

## Book Model - Definición del Modelo

### Importaciones
```python
from typing import Optional, Dict, Any
from datetime import datetime
from models.db import db
```

### Estructura de la Tabla
```python
class Book(db.Model):
    __tablename__ = "books"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    published_year = db.Column(db.Integer, nullable=True)
    isbn = db.Column(db.String(50), nullable=True)
    genre = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
```

**Campos de la tabla:**
- `id`: Clave primaria, entero autoincremental
- `title`: Título del libro, string de máximo 200 caracteres, requerido
- `author`: Autor del libro, string de máximo 200 caracteres, requerido
- `published_year`: Año de publicación, entero (ej: 2024), opcional
- `isbn`: Código ISBN del libro, string de máximo 50 caracteres, opcional
- `genre`: Género literario del libro, string de máximo 100 caracteres, opcional
- `created_at`: Fecha y hora de creación del registro, DateTime, automático
- `updated_at`: Fecha y hora de última actualización, DateTime, automático

**Características:**
- `created_at` se establece automáticamente al crear el registro
- `updated_at` se actualiza automáticamente cada vez que se modifica el registro
- `published_year` es un entero para facilitar validaciones y ordenamiento

## User Model - Definición del Modelo

### Importaciones
```python
from models.db import db
import logging
```

### Estructura de la Tabla
```python
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
```

**Campos de la tabla:**
- `id`: Clave primaria, entero autoincremental
- `username`: Nombre de usuario, string de máximo 80 caracteres, único, requerido, indexado
- `password`: Contraseña del usuario, string de máximo 255 caracteres, requerido

**Características de seguridad:**
- `unique=True`: Evita usuarios duplicados
- `index=True`: Optimiza búsquedas por username
- Contraseña con longitud suficiente para hashing seguro

## Book Model - Métodos del Modelo

### 1. Constructor `__init__()`
```python
def __init__(self, title: str, author: str, published_year: Optional[int] = None, 
             isbn: Optional[str] = None, genre: Optional[str] = None):
```

**Funcionalidad:**
- Inicializa una nueva instancia del libro
- Establece automáticamente las fechas de creación y actualización
- Asigna todos los campos del libro

**Parámetros:**
- `title`: Título del libro (requerido)
- `author`: Autor del libro (requerido)
- `published_year`: Año de publicación (opcional, entero)
- `isbn`: Código ISBN del libro (opcional)
- `genre`: Género literario del libro (opcional)
1. **ISO Format**: `2023-12-25T10:30:00Z`
2. **Date Format**: `2023-12-25`
3. **Fallback**: Fecha actual si no se puede parsear

**Proceso de parsing:**
```python
try:
    return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
except (ValueError, AttributeError):
    try:
        return datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        return datetime.now()
```

### 2. Serialización `to_dict()`
```python
def to_dict(self) -> Dict[str, Any]:
```

**Funcionalidad:**
- Convierte la instancia del modelo a diccionario
- Útil para serialización JSON en APIs
- Incluye timestamps de creación y actualización
- Formato ISO 8601 para las fechas

**Retorna:**
```json
{
    "id": 1,
    "title": "El Quijote de la Mancha",
    "author": "Miguel de Cervantes",
    "published_year": 1605,
    "isbn": "978-84-376-0675-0",
    "genre": "Novela",
    "created_at": "2025-10-08T10:30:00.123456",
    "updated_at": "2025-10-08T15:45:30.654321"
}
```

### 3. Actualización `update()`
```python
def update(self, title: Optional[str] = None, author: Optional[str] = None, 
           published_year: Optional[int] = None, isbn: Optional[str] = None, 
           genre: Optional[str] = None):
```

**Funcionalidad:**
- Actualiza selectivamente los campos del libro
- Solo actualiza campos que no sean None
- Actualiza automáticamente el timestamp `updated_at`
- Permite actualización de todos los campos disponibles

**Ventajas:**
- Actualización parcial de datos
- Preserva valores existentes si no se especifican nuevos
- Timestamp automático de última modificación
- Flexibilidad para actualizar cualquier combinación de campos

### 4. Validación Estática `validate_book_data()`
```python
@staticmethod
def validate_book_data(data: Dict[str, Any]) -> Optional[str]:
```

**Funcionalidad:**
- Valida diccionarios de datos antes de crear/actualizar libros
- Método estático, no requiere instancia
- Retorna mensaje de error o None si es válido

**Validaciones realizadas:**
1. **Título requerido**: Verifica que el título exista y no esté vacío
2. **Autor requerido**: Verifica que el autor exista y no esté vacío
3. **Tipo y rango de año**: Si se proporciona, debe ser entero entre 1000 y año actual + 10
4. **Tipo de ISBN**: Si se proporciona ISBN, debe ser string
5. **Tipo de género**: Si se proporciona género, debe ser string

**Mensajes de error:**
- `"Title is required."`: Cuando falta el título
- `"Author is required."`: Cuando falta el autor  
- `"Published year must be an integer."`: Cuando el año no es entero
- `"Published year must be between 1000 and 2035."`: Cuando el año está fuera de rango
- `"ISBN must be a string."`: Cuando el ISBN no es string
- `"Genre must be a string."`: Cuando el género no es string

## User Model - Métodos del Modelo

### 1. Constructor `__init__()`
```python
def __init__(self, username: str, password: str):
```

**Funcionalidad:**
- Inicializa una nueva instancia del usuario
- Asigna username y password directamente
- Constructor simple y directo

**Parámetros:**
- `username`: Nombre de usuario (requerido)
- `password`: Contraseña del usuario (requerido)

### 2. Representación `__repr__()`
```python
def __repr__(self):
```

**Funcionalidad:**
- Proporciona representación string del objeto
- Incluye logging de la operación
- Útil para debugging y desarrollo

**Retorna:**
```
<User nombre_usuario>
```

### 3. Serialización Segura `to_dict()`
```python
def to_dict(self):
```

**Funcionalidad:**
- Convierte la instancia del usuario a diccionario
- **Excluye la contraseña por seguridad**
- Útil para respuestas JSON de API

**Retorna:**
```json
{
    "id": 1,
    "username": "nombre_usuario"
}
```

### 4. Validación Estática `validate_user_data()`
```python
@staticmethod
def validate_user_data(data):
```

**Funcionalidad:**
- Valida diccionarios de datos antes de crear/actualizar usuarios
- Método estático, no requiere instancia
- Validaciones de seguridad y formato

**Validaciones realizadas:**
1. **Username requerido**: Verifica que el username exista
2. **Password requerido**: Verifica que el password exista
3. **Longitud mínima username**: Mínimo 3 caracteres
4. **Longitud máxima username**: Máximo 80 caracteres
5. **Longitud mínima password**: Mínimo 6 caracteres

**Mensajes de error:**
- `"Username es requerido"`: Cuando falta el username
- `"Password es requerido"`: Cuando falta el password
- `"Username debe tener al menos 3 caracteres"`: Username muy corto
- `"Username no puede exceder 80 caracteres"`: Username muy largo
- `"Password debe tener al menos 6 caracteres"`: Password muy corto

## Ejemplos de Uso

### Book Model - Crear un nuevo libro
```python
# Con todos los campos
book = Book(
    title="El Quijote",
    author="Miguel de Cervantes",
    published_date="1605-01-16",
    editorials="Francisco de Robles",
    gender="Novela",
    language="Español",
    pages=863,
    isbn="978-84-376-0494-7"
)

# Solo con campos básicos (usará fecha actual)
book = Book(
    title="Libro Moderno",
    author="Autor Contemporáneo"
)

# Con algunos campos opcionales
book = Book(
    title="Cien años de soledad",
    author="Gabriel García Márquez",
    published_date="1967-05-30",
    editorials="Editorial Sudamericana",
    language="Español",
    pages=417
)
```

### Book Model - Validar datos antes de crear
```python
data = {
    "title": "Nuevo Libro",
    "author": "Nuevo Autor",
    "published_date": "2023-12-25",
    "editorials": "Nueva Editorial",
    "gender": "Ficción",
    "language": "Español",
    "pages": 300,
    "isbn": "978-84-1234-567-8"
}

error = Book.validate_book_data(data)
if error:
    print(f"Error de validación: {error}")
else:
    book = Book(**data)
```

### Book Model - Serializar para API
```python
book = Book("Ejemplo", "Autor Ejemplo", editorials="Editorial Ejemplo", language="Español", pages=250)
json_data = book.to_dict()
# Resultado: {
#   "id": None, 
#   "title": "Ejemplo", 
#   "author": "Autor Ejemplo", 
#   "published_date": "2025-09-21T...",
#   "editorials": "Editorial Ejemplo",
#   "gender": None,
#   "language": "Español",
#   "pages": 250,
#   "isbn": None
# }
```

### Book Model - Actualizar libro existente
```python
# Actualización parcial - solo algunos campos
book.update(
    title="Título Actualizado",
    published_date="2024-01-01",
    pages=450
)
# El autor, editorial, género, idioma e ISBN permanecen sin cambios

# Actualización completa
book.update(
    title="Título Completamente Nuevo",
    author="Nuevo Autor",
    published_date="2024-06-15",
    editorials="Nueva Editorial",
    gender="Ensayo",
    language="Inglés",
    pages=250,
    isbn="978-0-1234-5678-9"
)
```

### User Model - Crear un nuevo usuario
```python
# Usuario básico
user = User(
    username="usuario123",
    password="contraseña_segura"
)

# El password debería estar hasheado en un caso real
```

### User Model - Validar datos antes de crear
```python
data = {
    "username": "nuevo_usuario",
    "password": "mi_password_seguro"
}

error = User.validate_user_data(data)
if error:
    print(f"Error de validación: {error}")
else:
    user = User(**data)
```

### User Model - Serializar para API (seguro)
```python
user = User("ejemplo_user", "password123")
user.id = 1  # Simulando que se guardó en BD
json_data = user.to_dict()
# Resultado: {
#   "id": 1,
#   "username": "ejemplo_user"
#   # Note: password NO está incluido por seguridad
# }
```

### User Model - Representación para debugging
```python
user = User("debug_user", "debug_pass")
print(user)  # Resultado: <User debug_user>
# También registra en logs: "Representación de usuario solicitada: debug_user"
```

## Características Avanzadas

### 1. Manejo Robusto de Fechas (Book Model)
- Acepta múltiples formatos de entrada
- Conversión automática a datetime
- Fallback a fecha actual para entradas inválidas
- Detección automática de string vs datetime en serialización

### 2. Validación Defensiva (Ambos Modelos)
- Verificación de tipos de datos
- Validación de campos requeridos
- Mensajes de error descriptivos
- Validaciones de seguridad específicas para usuarios

### 3. Flexibilidad en Actualizaciones (Book Model)
- Actualización parcial de campos
- Preservación de datos existentes
- Reutilización de lógica de validación

### 4. Compatibilidad con APIs (Ambos Modelos)
- Serialización automática a JSON
- Formato estándar de respuesta
- Manejo de tipos de datos complejos
- Exclusión de datos sensibles (password)

### 5. Seguridad (User Model)
- Validación de longitud de credenciales
- Username único con índice para rendimiento
- Exclusión automática de password en serialización
- Soporte para hashing de passwords

### 6. Sistema de Logging (User Model)
- Logging integrado para auditoría
- Registro de operaciones de representación
- Facilita debugging y monitoreo

### 7. Integración Flask-SQLAlchemy
- Herencia de `db.Model` para funcionalidad completa
- Compatibilidad con migraciones de Flask
- Manejo automático de sesiones
- Soporte para relaciones (futuras extensiones)

## Estructura de Archivos de la Carpeta Models

```
models/
├── __init__.py              # Marca el directorio como paquete Python
├── book_model.py            # Modelo para libros con validación avanzada
├── user_model.py            # Modelo para usuarios con seguridad
├── db.py                    # Configuración central de Flask-SQLAlchemy
└── README_Model.md          # Esta documentación
```

## Consideraciones de Tipos de Datos

### Book Model
- **pages**: Campo tipo **entero** (no string como en versiones anteriores)
- **published_date**: String que se convierte a datetime internamente
- **id**: Autoincremental, manejado por SQLAlchemy

### User Model
- **username**: String con restricciones de longitud y unicidad
- **password**: String con longitud suficiente para hashing
- **id**: Autoincremental, manejado por SQLAlchemy

## Integración con Flask-SQLAlchemy

### Configuración de la Aplicación
```python
from flask import Flask
from models.db import db
from models.book_model import Book
from models.user_model import User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'

# Inicializar SQLAlchemy con la app
db.init_app(app)

# Crear tablas
with app.app_context():
    db.create_all()
```

### Uso en Controladores
```python
from models.db import db
from models.book_model import Book
from models.user_model import User

# Crear nuevo libro
book = Book(title="Ejemplo", author="Autor")
db.session.add(book)
db.session.commit()

# Buscar usuario
user = User.query.filter_by(username="ejemplo").first()
```

## Ventajas del Diseño

1. **Robustez**: Manejo de errores y validación integral
2. **Flexibilidad**: Soporte para múltiples formatos de fecha y actualizaciones parciales
3. **Seguridad**: Validaciones de credenciales y exclusión de datos sensibles
4. **Reutilización**: Métodos estáticos para validación
5. **Mantenibilidad**: Código bien estructurado y documentado
6. **Escalabilidad**: Fácil extensión para nuevos campos y modelos
7. **Testabilidad**: Métodos independientes fáciles de testear
8. **Auditabilidad**: Sistema de logging integrado
9. **Rendimiento**: Índices en campos críticos y optimizaciones de consulta
10. **Compatibilidad**: Integración completa con Flask y SQLAlchemy

## Extensibilidad Futura

El diseño actual facilita:
- **Relaciones entre modelos**: User puede tener muchos Books
- **Nuevos campos**: Fácil agregar campos a cualquier modelo
- **Validaciones adicionales**: Extensión de métodos de validación
- **Nuevos modelos**: Seguir el mismo patrón para otras entidades
- **Middleware**: Hooks para operaciones pre/post guardado
- **Caching**: Integración con sistemas de cache
- **Indexación**: Agregar más índices según necesidades de rendimiento