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
```

**Campos de la tabla:**
- `id`: Clave primaria, entero autoincremental
- `title`: Título del libro, string de máximo 100 caracteres, requerido
- `author`: Autor del libro, string de máximo 100 caracteres, requerido
- `published_date`: Fecha de publicación, string de máximo 100 caracteres, opcional

## Métodos del Modelo

### 1. Constructor `__init__()`
```python
def __init__(self, title: str, author: str, published_date: Optional[str] = None):
```

**Funcionalidad:**
- Inicializa una nueva instancia del libro
- Procesa la fecha de publicación usando `_parse_date()`
- Si no se proporciona fecha, usa la fecha actual

**Parámetros:**
- `title`: Título del libro (requerido)
- `author`: Autor del libro (requerido)
- `published_date`: Fecha de publicación (opcional)

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
    "published_date": "2023-12-25T10:30:00"
}
```

### 4. Actualización `update()`
```python
def update(self, title: Optional[str] = None, author: Optional[str] = None, published_date: Optional[str] = None):
```

**Funcionalidad:**
- Actualiza selectivamente los campos del libro
- Solo actualiza campos que no sean None
- Procesa fechas usando `_parse_date()`

**Ventajas:**
- Actualización parcial de datos
- Preserva valores existentes si no se especifican nuevos
- Reutiliza lógica de parsing de fechas

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

**Mensajes de error:**
- `"Title is required."`: Cuando falta el título
- `"Author is required."`: Cuando falta el autor  
- `"Published date must be a string."`: Cuando la fecha no es string

## Ejemplos de Uso

### Crear un nuevo libro
```python
# Con fecha específica
book = Book(
    title="El Quijote",
    author="Miguel de Cervantes",
    published_date="1605-01-16"
)

# Sin fecha (usará fecha actual)
book = Book(
    title="Libro Moderno",
    author="Autor Contemporáneo"
)
```

### Validar datos antes de crear
```python
data = {
    "title": "Nuevo Libro",
    "author": "Nuevo Autor",
    "published_date": "2023-12-25"
}

error = Book.validate_book_data(data)
if error:
    print(f"Error de validación: {error}")
else:
    book = Book(**data)
```

### Serializar para API
```python
book = Book("Ejemplo", "Autor Ejemplo")
json_data = book.to_dict()
# Resultado: {"id": None, "title": "Ejemplo", "author": "Autor Ejemplo", "published_date": "2023..."}
```

### Actualizar libro existente
```python
book.update(
    title="Título Actualizado",
    published_date="2024-01-01"
)
# El autor permanece sin cambios
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