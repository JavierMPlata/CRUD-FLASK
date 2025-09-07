# Servicios (Services)

Este módulo (`book_service.py`) implementa la capa de servicios que maneja la lógica de negocio de la aplicación. Actúa como intermediario entre los controladores y los repositorios, centralizando las reglas de negocio y coordinando las operaciones.

## Capa de Servicios

### Propósito en la Arquitectura
La capa de servicios tiene las siguientes responsabilidades:
- **Lógica de negocio**: Implementa las reglas y procesos de negocio
- **Coordinación**: Orquesta operaciones entre múltiples repositorios
- **Abstracción**: Proporciona una interfaz simplificada a los controladores
- **Transacciones**: Maneja transacciones complejas que involucran múltiples entidades

### Posición en la Arquitectura
```
Controllers ↔ Services ↔ Repositories ↔ Database
```

**Flujo de datos:**
1. **Controller** recibe request y delega a Service
2. **Service** aplica lógica de negocio y coordina Repository
3. **Repository** maneja acceso a datos
4. **Service** procesa resultado y retorna a Controller

## Clase BookService

### Estructura y Dependencias
```python
from repositories.book_repository import BookRepository
from models.book_model import Book
from sqlalchemy.orm import Session

class BookService:
    def __init__(self, db_session: Session):
        self.book_repository = BookRepository(db_session)
```

**Características:**
- **Inyección de dependencias**: Recibe sesión de base de datos
- **Encapsulación del repositorio**: Crea y maneja instancia de BookRepository
- **Punto único de acceso**: Interfaz unificada para operaciones de libros

### Patrón de Diseño
- **Service Layer Pattern**: Encapsula lógica de negocio
- **Facade Pattern**: Simplifica interacción con subsistemas
- **Delegation Pattern**: Delega operaciones específicas al repositorio

## Métodos del Servicio

### 1. `get_all_books()` - Obtener Todos los Libros
```python
def get_all_books(self):
    return self.book_repository.get_all_books()
```

**Funcionalidad:**
- Delega directamente al repositorio
- Punto de extensión para lógica de negocio futura
- Interfaz consistente para el controlador

**Casos de uso actuales:**
- Listado completo de libros
- Operaciones de consulta masiva

**Extensiones futuras posibles:**
- Filtrado por criterios de negocio
- Paginación inteligente
- Ordenamiento personalizado
- Cache de resultados
- Logging de accesos

**Retorna:**
- `List[Book]`: Lista completa de libros

**Ejemplo de evolución:**
```python
def get_all_books(self, include_unpublished=False):
    books = self.book_repository.get_all_books()
    if not include_unpublished:
        # Lógica de negocio: filtrar libros no publicados
        books = [book for book in books if book.is_published]
    return books
```

### 2. `get_book_by_id(book_id: int)` - Obtener Libro por ID
```python
def get_book_by_id(self, book_id: int):
    return self.book_repository.get_book_by_id(book_id)
```

**Funcionalidad:**
- Búsqueda individual por identificador
- Validación implícita de existencia
- Base para operaciones más complejas

**Casos de uso actuales:**
- Consulta de detalles de libro específico
- Validación de existencia en otras operaciones

**Extensiones futuras posibles:**
- Validación de permisos de acceso
- Incremento de contador de vistas
- Registro de auditoría de acceso
- Cache de libros frecuentemente consultados

**Parámetros:**
- `book_id (int)`: Identificador único del libro

**Retorna:**
- `Book | None`: Libro encontrado o None

**Ejemplo de evolución:**
```python
def get_book_by_id(self, book_id: int, user_id=None):
    book = self.book_repository.get_book_by_id(book_id)
    if book and user_id:
        # Lógica de negocio: registrar acceso del usuario
        self.audit_service.log_book_access(user_id, book_id)
    return book
```

### 3. `create_book(book_data: dict)` - Crear Nuevo Libro
```python
def create_book(self, book_data: dict):
    return self.book_repository.create_book(book_data)
```

**Funcionalidad:**
- Creación de nuevos libros en el sistema
- Delegación directa al repositorio
- Punto de extensión para validaciones de negocio

**Casos de uso actuales:**
- Registro de nuevos libros en el catálogo
- Operaciones de importación de datos

**Extensiones futuras posibles:**
- Validaciones de negocio específicas
- Verificación de duplicados por título/autor
- Asignación automática de categorías
- Notificaciones a suscriptores
- Integración con servicios externos (ISBN, etc.)

**Parámetros:**
- `book_data (dict)`: Datos del libro a crear

**Retorna:**
- `Book`: Libro creado con ID asignado

**Ejemplo de evolución:**
```python
def create_book(self, book_data: dict):
    # Lógica de negocio: verificar duplicados
    existing = self.book_repository.find_by_title_and_author(
        book_data['title'], book_data['author']
    )
    if existing:
        raise BusinessException("Book already exists")
    
    # Lógica de negocio: enriquecer datos
    book_data = self.enrich_book_data(book_data)
    
    new_book = self.book_repository.create_book(book_data)
    
    # Lógica de negocio post-creación
    self.notification_service.notify_new_book(new_book)
    
    return new_book
```

### 4. `update_book(book_id: int, book_data: dict)` - Actualizar Libro
```python
def update_book(self, book_id: int, book_data: dict):
    return self.book_repository.update_book(book_id, book_data)
```

**Funcionalidad:**
- Actualización de libros existentes
- Validación implícita de existencia
- Preservación de integridad de datos

**Casos de uso actuales:**
- Corrección de información de libros
- Actualización de metadatos

**Extensiones futuras posibles:**
- Validación de permisos de edición
- Historial de cambios (auditoría)
- Validación de reglas de negocio
- Notificación de cambios importantes
- Sincronización con sistemas externos

**Parámetros:**
- `book_id (int)`: ID del libro a actualizar
- `book_data (dict)`: Datos a actualizar

**Retorna:**
- `Book | None`: Libro actualizado o None si no existe

**Ejemplo de evolución:**
```python
def update_book(self, book_id: int, book_data: dict, user_id=None):
    # Lógica de negocio: verificar permisos
    if not self.auth_service.can_edit_book(user_id, book_id):
        raise UnauthorizedException("Cannot edit this book")
    
    # Lógica de negocio: preservar historial
    old_book = self.book_repository.get_book_by_id(book_id)
    if old_book:
        self.audit_service.log_book_change(old_book, book_data, user_id)
    
    updated_book = self.book_repository.update_book(book_id, book_data)
    
    # Lógica de negocio: notificar cambios críticos
    if self.is_critical_change(book_data):
        self.notification_service.notify_book_updated(updated_book)
    
    return updated_book
```

### 5. `delete_book(book_id: int)` - Eliminar Libro
```python
def delete_book(self, book_id: int):
    return self.book_repository.delete_book(book_id)
```

**Funcionalidad:**
- Eliminación de libros del sistema
- Validación de existencia antes de eliminar
- Operación irreversible (en implementación actual)

**Casos de uso actuales:**
- Limpieza de catálogo
- Eliminación de registros erróneos

**Extensiones futuras posibles:**
- Soft delete (marcado como eliminado)
- Validación de dependencias
- Confirmación de operaciones críticas
- Archivo de libros eliminados
- Validación de permisos de eliminación

**Parámetros:**
- `book_id (int)`: ID del libro a eliminar

**Retorna:**
- `Book | None`: Libro eliminado o None si no existía

**Ejemplo de evolución:**
```python
def delete_book(self, book_id: int, user_id=None, soft_delete=True):
    # Lógica de negocio: verificar permisos
    if not self.auth_service.can_delete_book(user_id, book_id):
        raise UnauthorizedException("Cannot delete this book")
    
    book = self.book_repository.get_book_by_id(book_id)
    if not book:
        return None
    
    # Lógica de negocio: verificar dependencias
    if self.has_active_references(book_id):
        raise BusinessException("Cannot delete book with active references")
    
    if soft_delete:
        # Soft delete: marcar como eliminado
        book_data = {"is_deleted": True, "deleted_at": datetime.now()}
        return self.book_repository.update_book(book_id, book_data)
    else:
        # Hard delete: eliminar permanentemente
        self.audit_service.log_book_deletion(book, user_id)
        return self.book_repository.delete_book(book_id)
```

## Características del Diseño Actual

### 1. Simplicidad
- **Implementación directa**: Delegación simple al repositorio
- **Sin complejidad innecesaria**: No incluye lógica no requerida
- **Fácil comprensión**: Código claro y directo

### 2. Extensibilidad
- **Puntos de extensión claros**: Cada método puede evolucionar independientemente
- **Separación de responsabilidades**: Lógica de negocio separada del acceso a datos
- **Base sólida**: Estructura preparada para crecimiento

### 3. Consistencia
- **Interfaz uniforme**: Todos los métodos siguen el mismo patrón
- **Manejo de errores**: Comportamiento consistente con valores de retorno
- **Naming convention**: Nombres descriptivos y consistentes

## Ventajas de la Implementación

### 1. Preparación para el Futuro
```python
# Estado actual: delegación simple
def create_book(self, book_data: dict):
    return self.book_repository.create_book(book_data)

# Evolución futura: lógica de negocio compleja
def create_book(self, book_data: dict):
    self.validate_business_rules(book_data)
    enriched_data = self.enrich_book_data(book_data)
    new_book = self.book_repository.create_book(enriched_data)
    self.trigger_post_creation_events(new_book)
    return new_book
```

### 2. Testabilidad
- **Isolación**: Cada método puede ser testeado independientemente
- **Mocking**: Fácil mockeo del repositorio para tests unitarios
- **Predictibilidad**: Comportamiento consistente y predecible

### 3. Mantenibilidad
- **Cambios localizados**: Modificaciones en un lugar no afectan otros
- **Refactoring seguro**: Estructura clara facilita refactoring
- **Documentación implícita**: Código autodocumentado

## Evolución de la Arquitectura

### Escenarios de Crecimiento

#### 1. Validaciones de Negocio
```python
def create_book(self, book_data: dict):
    # Validar reglas de negocio
    if not self.is_valid_isbn(book_data.get('isbn')):
        raise InvalidISBNException()
    
    if self.is_duplicate_book(book_data):
        raise DuplicateBookException()
    
    return self.book_repository.create_book(book_data)
```

#### 2. Integración con Servicios Externos
```python
def create_book(self, book_data: dict):
    # Enriquecer con datos externos
    external_data = self.isbn_service.get_book_details(book_data['isbn'])
    enriched_data = {**book_data, **external_data}
    
    return self.book_repository.create_book(enriched_data)
```

#### 3. Operaciones Transaccionales Complejas
```python
def transfer_book_ownership(self, book_id: int, from_user: int, to_user: int):
    # Operación que involucra múltiples entidades
    book = self.book_repository.get_book_by_id(book_id)
    
    # Actualizar libro
    self.book_repository.update_book(book_id, {"owner_id": to_user})
    
    # Registrar transferencia
    self.transfer_repository.create_transfer({
        "book_id": book_id,
        "from_user": from_user,
        "to_user": to_user,
        "transfer_date": datetime.now()
    })
    
    # Notificar usuarios
    self.notification_service.notify_transfer(book, from_user, to_user)
    
    return book
```

## Integración con la Arquitectura Completa

### Relación con Controladores
```python
# En book_controller.py
service = BookService(get_db_session())

@book_bp.route('/books', methods=['POST'])
def create_book():
    data = request.json
    # Validación en controlador
    error = Book.validate_book_data(data)
    if error:
        return jsonify({"error": error}), 400
    
    # Delegación a servicio
    new_book = service.create_book(data)
    return jsonify(new_book.to_dict()), 201
```

### Relación con Repositorios
```python
# En BookService
def __init__(self, db_session: Session):
    self.book_repository = BookRepository(db_session)
    # En el futuro: múltiples repositorios
    # self.author_repository = AuthorRepository(db_session)
    # self.category_repository = CategoryRepository(db_session)
```

## Principios de Diseño Aplicados

### 1. Single Responsibility Principle (SRP)
- Cada método tiene una responsabilidad específica
- La clase se encarga únicamente de lógica de negocio de libros

### 2. Open/Closed Principle (OCP)
- Abierto para extensión (agregar lógica de negocio)
- Cerrado para modificación (interfaz estable)

### 3. Dependency Inversion Principle (DIP)
- Depende de abstracciones (Repository interface implícita)
- No depende de implementaciones concretas de base de datos

### 4. Don't Repeat Yourself (DRY)
- Reutilización del repositorio en todos los métodos
- Patrón consistente en toda la clase