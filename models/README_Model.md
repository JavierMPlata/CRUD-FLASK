# Modelos (Models)

Este módulo (`book_model.py`) define el modelo de datos para la entidad Book utilizando SQLAlchemy ORM. Representa la estructura de datos y las reglas de negocio para los libros en la aplicación.

## Arquitectura del Modelo

### SQLAlchemy ORM
- Utiliza SQLAlchemy como ORM (Object-Relational Mapping)
- Hereda de `declarative_base()` para definición declarativa
- Mapeo automático entre objetos Python y tablas de base de datos

### Características del Modelo
- **Validación de datos**: Métodos integrados para validar información
- **Serialización**: Conversión automática a diccionarios JSON
- **Parsing de fechas**: Manejo flexible de formatos de fecha
- **Actualización parcial**: Método para updates selectivos

## Definición del Modelo

### Importaciones
```python
from typing import Optional, Dict, Any
from datetime import datetime
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, declarative_base
```

### Estructura de la Tabla
```python
class Book(Base):
    __tablename__ = "books"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    author = Column(String(100), nullable=False)
    published_date = Column(String(100), nullable=True)
    editorials = Column(String(100), nullable=True)
    gender = Column(String(100), nullable=True)
    language = Column(String(100), nullable=True)
    pages = Column(String(100), nullable=True)
    isbn = Column(String(100), nullable=True)
```

**Campos de la tabla:**
- `id`: Clave primaria, entero autoincremental
- `title`: Título del libro, string de máximo 100 caracteres, requerido
- `author`: Autor del libro, string de máximo 100 caracteres, requerido
- `published_date`: Fecha de publicación, string de máximo 100 caracteres, opcional
- `editorials`: Editorial del libro, string de máximo 100 caracteres, opcional
- `gender`: Género literario del libro, string de máximo 100 caracteres, opcional
- `language`: Idioma del libro, string de máximo 100 caracteres, opcional
- `pages`: Número de páginas del libro, string de máximo 100 caracteres, opcional
- `isbn`: Código ISBN del libro, string de máximo 100 caracteres, opcional

## Métodos del Modelo

### 1. Constructor `__init__()`
```python
def __init__(self, title: str, author: str, published_date: Optional[str] = None, 
             editorials: Optional[str] = None, gender: Optional[str] = None, 
             language: Optional[str] = None, pages: Optional[str] = None, 
             isbn: Optional[str] = None):
```

**Funcionalidad:**
- Inicializa una nueva instancia del libro
- Procesa la fecha de publicación usando `_parse_date()`
- Si no se proporciona fecha, usa la fecha actual
- Asigna todos los campos adicionales del libro

**Parámetros:**
- `title`: Título del libro (requerido)
- `author`: Autor del libro (requerido)
- `published_date`: Fecha de publicación (opcional)
- `editorials`: Editorial del libro (opcional)
- `gender`: Género literario del libro (opcional)
- `language`: Idioma del libro (opcional)
- `pages`: Número de páginas del libro (opcional)
- `isbn`: Código ISBN del libro (opcional)

### 2. Parser de Fechas `_parse_date()`
```python
def _parse_date(self, date_str: str) -> datetime:
```

**Funcionalidad:**
- Convierte strings de fecha a objetos datetime
- Maneja múltiples formatos de fecha
- Fallback a fecha actual si el parsing falla

**Formatos soportados:**
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

### 3. Serialización `to_dict()`
```python
def to_dict(self) -> Dict[str, Any]:
```

**Funcionalidad:**
- Convierte la instancia del modelo a diccionario
- Útil para serialización JSON en APIs
- Maneja conversión de datetime a string ISO

**Retorna:**
```json
{
    "id": 1,
    "title": "Título del libro",
    "author": "Nombre del autor",
    "published_date": "2023-12-25T10:30:00",
    "editorials": "Editorial del libro",
    "gender": "Género literario",
    "language": "Idioma del libro",
    "pages": "Número de páginas",
    "isbn": "Código ISBN"
}
```

### 4. Actualización `update()`
```python
def update(self, title: Optional[str] = None, author: Optional[str] = None, 
           published_date: Optional[str] = None, editorials: Optional[str] = None, 
           gender: Optional[str] = None, language: Optional[str] = None, 
           pages: Optional[str] = None, isbn: Optional[str] = None):
```

**Funcionalidad:**
- Actualiza selectivamente los campos del libro
- Solo actualiza campos que no sean None
- Procesa fechas usando `_parse_date()`
- Permite actualización de todos los campos disponibles

**Ventajas:**
- Actualización parcial de datos
- Preserva valores existentes si no se especifican nuevos
- Reutiliza lógica de parsing de fechas
- Flexibilidad para actualizar cualquier combinación de campos

### 5. Validación Estática `validate_book_data()`
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
3. **Tipo de fecha**: Si se proporciona fecha, debe ser string
4. **Tipo de editorial**: Si se proporciona editorial, debe ser string
5. **Tipo de género**: Si se proporciona género, debe ser string
6. **Tipo de idioma**: Si se proporciona idioma, debe ser string
7. **Tipo de páginas**: Si se proporciona páginas, debe ser string
8. **Tipo de ISBN**: Si se proporciona ISBN, debe ser string

**Mensajes de error:**
- `"Title is required."`: Cuando falta el título
- `"Author is required."`: Cuando falta el autor  
- `"Published date must be a string."`: Cuando la fecha no es string
- `"Editorials must be a string."`: Cuando la editorial no es string
- `"Gender must be a string."`: Cuando el género no es string
- `"Language must be a string."`: Cuando el idioma no es string
- `"Pages must be a string."`: Cuando las páginas no son string
- `"ISBN must be a string."`: Cuando el ISBN no es string

## Ejemplos de Uso

### Crear un nuevo libro
```python
# Con todos los campos
book = Book(
    title="El Quijote",
    author="Miguel de Cervantes",
    published_date="1605-01-16",
    editorials="Francisco de Robles",
    gender="Novela",
    language="Español",
    pages="863",
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
    language="Español"
)
```

### Validar datos antes de crear
```python
data = {
    "title": "Nuevo Libro",
    "author": "Nuevo Autor",
    "published_date": "2023-12-25",
    "editorials": "Nueva Editorial",
    "gender": "Ficción",
    "language": "Español",
    "pages": "300",
    "isbn": "978-84-1234-567-8"
}

error = Book.validate_book_data(data)
if error:
    print(f"Error de validación: {error}")
else:
    book = Book(**data)
```

### Serializar para API
```python
book = Book("Ejemplo", "Autor Ejemplo", editorials="Editorial Ejemplo", language="Español")
json_data = book.to_dict()
# Resultado: {
#   "id": None, 
#   "title": "Ejemplo", 
#   "author": "Autor Ejemplo", 
#   "published_date": "2025-09-07T...",
#   "editorials": "Editorial Ejemplo",
#   "gender": None,
#   "language": "Español",
#   "pages": None,
#   "isbn": None
# }
```

### Actualizar libro existente
```python
# Actualización parcial - solo algunos campos
book.update(
    title="Título Actualizado",
    published_date="2024-01-01",
    pages="450"
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
    pages="250",
    isbn="978-0-1234-5678-9"
)
```

## Características Avanzadas

### 1. Manejo Robusto de Fechas
- Acepta múltiples formatos de entrada
- Conversión automática a datetime
- Fallback a fecha actual para entradas inválidas

### 2. Validación Defensiva
- Verificación de tipos de datos
- Validación de campos requeridos
- Mensajes de error descriptivos

### 3. Flexibilidad en Actualizaciones
- Actualización parcial de campos
- Preservación de datos existentes
- Reutilización de lógica de validación

### 4. Compatibilidad con APIs
- Serialización automática a JSON
- Formato estándar de respuesta
- Manejo de tipos de datos complejos

## Ventajas del Diseño

1. **Robustez**: Manejo de errores y validación integral
2. **Flexibilidad**: Soporte para múltiples formatos de fecha
3. **Reutilización**: Métodos estáticos para validación
4. **Mantenibilidad**: Código bien estructurado y documentado
5. **Escalabilidad**: Fácil extensión para nuevos campos
6. **Testabilidad**: Métodos independientes fáciles de testear

## Integración con SQLAlchemy

- **Base declarativa**: Hereda de `Base` para mapeo ORM
- **Definición de tabla**: Especifica nombre y estructura
- **Tipos de columna**: Usa tipos SQLAlchemy apropiados
- **Constraints**: Define claves primarias y restricciones de nulidad