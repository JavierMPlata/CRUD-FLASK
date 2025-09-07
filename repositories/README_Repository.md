# Repositorios (Repositories)

Este módulo (`book_repository.py`) implementa el patrón Repository para manejar las operaciones de acceso a datos (CRUD) de la entidad Book. Actúa como una capa de abstracción entre la lógica de negocio y la base de datos.

## Patrón Repository

### Propósito
- **Abstracción de datos**: Separa la lógica de acceso a datos del resto de la aplicación
- **Encapsulación**: Encapsula las consultas SQLAlchemy en métodos específicos
- **Testabilidad**: Facilita el testing mediante inyección de dependencias
- **Mantenibilidad**: Centraliza las operaciones de base de datos

### Ventajas del Patrón
1. **Separación de responsabilidades**: El repositorio se encarga únicamente del acceso a datos
2. **Reutilización**: Métodos reutilizables para operaciones CRUD
3. **Consistencia**: Interfaz uniforme para interactuar con la base de datos
4. **Flexibilidad**: Fácil cambio de implementación de persistencia

## Clase BookRepository

### Estructura y Dependencias
```python
from models.book_model import Book
from sqlalchemy.orm import Session

class BookRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session
```

**Características:**
- Recibe una sesión de SQLAlchemy mediante inyección de dependencias
- Mantiene referencia a la sesión para todas las operaciones
- No maneja la creación o cierre de sesiones (responsabilidad externa)

## Métodos CRUD

### 1. `get_all_books()` - Obtener Todos los Libros
```python
def get_all_books(self):
    return self.db_session.query(Book).all()
```

**Funcionalidad:**
- Ejecuta consulta SELECT para obtener todos los registros
- Retorna lista de objetos Book
- No aplica filtros ni paginación

**Retorna:**
- `List[Book]`: Lista de todos los libros en la base de datos
- Lista vacía si no hay libros

**Uso típico:**
```python
repository = BookRepository(session)
all_books = repository.get_all_books()
```

### 2. `get_book_by_id(book_id: int)` - Obtener Libro por ID
```python
def get_book_by_id(self, book_id: int):
    return self.db_session.query(Book).filter(Book.id == book_id).first()
```

**Funcionalidad:**
- Busca un libro específico por su clave primaria
- Utiliza `.first()` para obtener solo el primer resultado
- Retorna None si no encuentra el libro

**Parámetros:**
- `book_id (int)`: ID único del libro a buscar

**Retorna:**
- `Book | None`: Objeto Book si existe, None si no se encuentra

**Uso típico:**
```python
book = repository.get_book_by_id(1)
if book:
    print(f"Libro encontrado: {book.title}")
else:
    print("Libro no encontrado")
```

### 3. `create_book(book_data: dict)` - Crear Nuevo Libro
```python
def create_book(self, book_data: dict):
    # Remove 'id' from book_data if it exists to let the database auto-generate it
    book_data_copy = book_data.copy()
    book_data_copy.pop('id', None)
    
    new_book = Book(**book_data_copy)
    self.db_session.add(new_book)
    self.db_session.commit()
    self.db_session.refresh(new_book)
    return new_book
```

**Funcionalidad:**
- Crea una nueva instancia de Book con los datos proporcionados
- Elimina el campo 'id' si existe (auto-generado por la base de datos)
- Persiste el objeto en la base de datos
- Actualiza el objeto con datos generados (como el ID)

**Características especiales:**
- **Copia defensiva**: Crea una copia de los datos para no modificar el original
- **Auto-generación de ID**: Elimina ID manual para usar autoincrement
- **Commit automático**: Confirma la transacción inmediatamente
- **Refresh**: Actualiza el objeto con datos de la base de datos (ID generado)

**Parámetros:**
- `book_data (dict)`: Diccionario con los datos del libro

**Retorna:**
- `Book`: Objeto Book creado con ID asignado

**Ejemplo de uso:**
```python
book_data = {
    "title": "Nuevo Libro",
    "author": "Autor Ejemplo",
    "published_date": "2023-12-25"
}
new_book = repository.create_book(book_data)
print(f"Libro creado con ID: {new_book.id}")
```

### 4. `update_book(book_id: int, book_data: dict)` - Actualizar Libro
```python
def update_book(self, book_id: int, book_data: dict):
    book = self.get_book_by_id(book_id)
    if book:
        book.update(**book_data)
        self.db_session.commit()
        self.db_session.refresh(book)
    return book
```

**Funcionalidad:**
- Busca el libro por ID usando método interno
- Actualiza solo si el libro existe
- Utiliza el método `update()` del modelo Book
- Confirma cambios y actualiza el objeto

**Proceso de actualización:**
1. **Búsqueda**: Localiza el libro por ID
2. **Verificación**: Procede solo si el libro existe
3. **Actualización**: Usa método del modelo para actualizar campos
4. **Persistencia**: Confirma cambios en la base de datos
5. **Refresh**: Sincroniza objeto con estado de la base de datos

**Parámetros:**
- `book_id (int)`: ID del libro a actualizar
- `book_data (dict)`: Diccionario con campos a actualizar

**Retorna:**
- `Book | None`: Objeto Book actualizado o None si no existe

**Ejemplo de uso:**
```python
update_data = {
    "title": "Título Actualizado",
    "published_date": "2024-01-01"
}
updated_book = repository.update_book(1, update_data)
if updated_book:
    print("Libro actualizado exitosamente")
```

### 5. `delete_book(book_id: int)` - Eliminar Libro
```python
def delete_book(self, book_id: int):
    book = self.get_book_by_id(book_id)
    if book:
        self.db_session.delete(book)
        self.db_session.commit()
    return book
```

**Funcionalidad:**
- Busca el libro por ID
- Elimina solo si el libro existe
- Confirma la eliminación en la base de datos
- Retorna el objeto eliminado para confirmación

**Proceso de eliminación:**
1. **Búsqueda**: Localiza el libro por ID
2. **Verificación**: Procede solo si el libro existe
3. **Eliminación**: Marca el objeto para eliminación
4. **Persistencia**: Confirma la eliminación en la base de datos

**Parámetros:**
- `book_id (int)`: ID del libro a eliminar

**Retorna:**
- `Book | None`: Objeto Book eliminado o None si no existía

**Ejemplo de uso:**
```python
deleted_book = repository.delete_book(1)
if deleted_book:
    print(f"Libro '{deleted_book.title}' eliminado exitosamente")
else:
    print("Libro no encontrado para eliminar")
```

## Características de Implementación

### 1. Manejo de Sesiones
- **Inyección de dependencias**: Recibe sesión como parámetro
- **No gestión de ciclo de vida**: No abre ni cierra sesiones
- **Reutilización**: Una sesión puede usarse para múltiples operaciones

### 2. Gestión de Transacciones
- **Commits explícitos**: Cada operación de escritura incluye commit
- **Atomicidad**: Operaciones individuales son atómicas
- **Refresh**: Sincronización post-commit para obtener datos actualizados

### 3. Manejo de Errores
- **Verificación de existencia**: Valida existencia antes de update/delete
- **Retorno consistente**: None para recursos no encontrados
- **Operaciones seguras**: No falla si el recurso no existe

### 4. Reutilización de Código
- **DRY**: `update_book` y `delete_book` reutilizan `get_book_by_id`
- **Consistencia**: Patrón uniforme en todos los métodos
- **Mantenibilidad**: Cambios en búsqueda se propagan automáticamente

## Ventajas del Diseño

### 1. Responsabilidad Única
- **Solo acceso a datos**: No contiene lógica de negocio
- **Operaciones CRUD**: Enfoque específico en persistencia
- **Delegación**: La lógica compleja se maneja en servicios

### 2. Testabilidad
- **Inyección de dependencias**: Fácil mockeo de sesiones
- **Métodos independientes**: Cada operación se puede testear aisladamente
- **Retornos predecibles**: Comportamiento consistente

### 3. Flexibilidad
- **Cambio de ORM**: Fácil migración a otro sistema de persistencia
- **Optimizaciones**: Modificación de consultas sin afectar la interfaz
- **Extensibilidad**: Fácil agregar nuevos métodos de consulta

### 4. Reutilización
- **Interfaz clara**: Métodos específicos para cada operación
- **Independencia**: Uso en diferentes contextos de la aplicación
- **Composición**: Combinación de operaciones para flujos complejos

## Integración con la Arquitectura

### Relación con Servicios
```python
# En BookService
def create_book(self, book_data):
    repository = BookRepository(self.db_session)
    return repository.create_book(book_data)
```

### Relación con Controladores
```python
# En book_controller.py
service = BookService(get_db_session())
# El servicio utiliza internamente BookRepository
```

### Flujo de Datos
1. **Controller** recibe request HTTP
2. **Service** procesa lógica de negocio
3. **Repository** maneja persistencia de datos
4. **Model** representa estructura de datos