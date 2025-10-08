# Repositorios (Repositories)

Este módulo implementa el patrón Repository para manejar las operaciones de acceso a datos (CRUD) de las entidades Book y User. Actúa como una capa de abstracción entre la lógica de negocio y la base de datos.

## Repositorios Disponibles

### 1. Book Repository (`book_repository.py`)
Repositorio para operaciones CRUD básicas de libros.

### 2. User Repository (`user_repository.py`)
Repositorio para operaciones CRUD de usuarios con logging avanzado y métodos especializados.

## Patrón Repository

### Propósito
- **Abstracción de datos**: Separa la lógica de acceso a datos del resto de la aplicación
- **Encapsulación**: Encapsula las consultas SQLAlchemy en métodos específicos
- **Testabilidad**: Facilita el testing mediante inyección de dependencias
- **Mantenibilidad**: Centraliza las operaciones de base de datos
- **Logging**: Auditoría detallada de operaciones de datos (User Repository)

### Ventajas del Patrón
1. **Separación de responsabilidades**: El repositorio se encarga únicamente del acceso a datos
2. **Reutilización**: Métodos reutilizables para operaciones CRUD
3. **Consistencia**: Interfaz uniforme para interactuar con la base de datos
4. **Flexibilidad**: Fácil cambio de implementación de persistencia
5. **Auditabilidad**: Logging completo de operaciones críticas

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
- Implementación simple y directa

## Clase UserRepository

### Estructura y Dependencias
```python
from models.user_model import User
from sqlalchemy.orm import Session
import logging

class UserRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session
```

**Características:**
- Recibe una sesión de SQLAlchemy mediante inyección de dependencias
- **Logging integrado**: Sistema completo de auditoría de operaciones
- **Métodos especializados**: Búsquedas por username además de ID
- **Logging detallado**: Registra éxitos, fallos y conteos de operaciones

## BookRepository - Métodos CRUD

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

## UserRepository - Métodos CRUD

### 1. `get_by_username(username: str)` - Obtener Usuario por Username
```python
def get_by_username(self, username: str):
```

**Funcionalidad:**
- Busca un usuario por su nombre de usuario único
- **Logging completo**: Registra búsqueda, éxito y fallos
- Utiliza `filter_by(username=username)` para búsqueda exacta

**Parámetros:**
- `username (str)`: Nombre de usuario a buscar

**Retorna:**
- `User | None`: Usuario encontrado o None

**Logging automático:**
```python
# Logs generados:
logger.info('Buscando usuario en repositorio: username')
logger.info('Usuario encontrado en repositorio: username')  # Si existe
logger.warning('Usuario no encontrado en repositorio: username')  # Si no existe
```

### 2. `get_by_id(user_id: int)` - Obtener Usuario por ID
```python
def get_by_id(self, user_id: int):
```

**Funcionalidad:**
- Busca un usuario por su ID único
- **Logging detallado**: Incluye username en logs cuando encuentra el usuario
- Utiliza `filter_by(id=user_id)` para búsqueda por clave primaria

**Parámetros:**
- `user_id (int)`: ID del usuario a buscar

**Retorna:**
- `User | None`: Usuario encontrado o None

**Logging automático:**
```python
# Logs generados:
logger.info('Buscando usuario por ID en repositorio: 1')
logger.info('Usuario encontrado en repositorio: username')  # Si existe
logger.warning('Usuario con ID 1 no encontrado en repositorio')  # Si no existe
```

### 3. `create_user(username: str, password: str)` - Crear Nuevo Usuario
```python
def create_user(self, username: str, password: str):
```

**Funcionalidad:**
- Crea un nuevo usuario con username y password
- **Logging del proceso**: Registra creación y resultado con ID asignado
- Commit automático y refresh para obtener ID generado

**Parámetros:**
- `username (str)`: Nombre de usuario
- `password (str)`: Contraseña (ya hasheada por el servicio)

**Retorna:**
- `User`: Usuario creado con ID asignado

**Proceso:**
1. **Creación**: Instancia nueva del modelo User
2. **Persistencia**: Add, commit y refresh
3. **Logging**: Registro del usuario creado con ID

**Logging automático:**
```python
# Logs generados:
logger.info('Creando usuario en repositorio: username')
logger.info('Usuario creado en repositorio: username (ID: 1)')
```

### 4. `get_all()` - Obtener Todos los Usuarios
```python
def get_all(self):
```

**Funcionalidad:**
- Obtiene todos los usuarios del sistema
- **Logging con conteo**: Registra cuántos usuarios se obtuvieron
- Consulta simple sin filtros

**Retorna:**
- `List[User]`: Lista de todos los usuarios

**Logging automático:**
```python
# Logs generados:
logger.info('Obteniendo todos los usuarios en repositorio')
logger.info('5 usuarios obtenidos en repositorio')  # Ejemplo con 5 usuarios
```

### 5. `update_user(user_id: int, user_data: dict)` - Actualizar Usuario
```python
def update_user(self, user_id: int, user_data: dict):
```

**Funcionalidad:**
- Actualiza un usuario existente por ID
- **Actualización dinámica**: Usa `setattr()` para actualizar cualquier campo
- **Logging de proceso**: Registra inicio y finalización de actualización
- Validación de atributos con `hasattr()`

**Parámetros:**
- `user_id (int)`: ID del usuario a actualizar
- `user_data (dict)`: Diccionario con campos a actualizar

**Retorna:**
- `User | None`: Usuario actualizado o None si no existe

**Proceso de actualización:**
1. **Búsqueda**: Usa `get_by_id()` interno
2. **Verificación**: Procede solo si el usuario existe
3. **Actualización dinámica**: Itera sobre campos y actualiza con `setattr()`
4. **Validación**: Verifica que el atributo exista en el modelo
5. **Persistencia**: Commit y refresh

**Logging automático:**
```python
# Logs generados:
logger.info('Actualizando usuario en repositorio: username')
logger.info('Usuario actualizado en repositorio: username')
```

### 6. `delete_user(user_id: int)` - Eliminar Usuario
```python
def delete_user(self, user_id: int):
```

**Funcionalidad:**
- Elimina un usuario por su ID
- **Logging completo**: Registra proceso de eliminación con username
- Eliminación permanente de la base de datos

**Parámetros:**
- `user_id (int)`: ID del usuario a eliminar

**Retorna:**
- `User | None`: Usuario eliminado o None si no existía

**Proceso de eliminación:**
1. **Búsqueda**: Usa `get_by_id()` interno
2. **Verificación**: Procede solo si el usuario existe
3. **Eliminación**: Marca para eliminación con `delete()`
4. **Persistencia**: Confirma con commit

**Logging automático:**
```python
# Logs generados:
logger.info('Eliminando usuario en repositorio: username')
logger.info('Usuario eliminado en repositorio: username')
```

## Características de Implementación

### 1. BookRepository - Simplicidad y Eficiencia
- **Implementación directa**: Métodos CRUD sin complejidad adicional
- **Copia defensiva**: Protege datos originales en operaciones de creación
- **Auto-generación de ID**: Manejo inteligente de claves primarias
- **Reutilización**: Métodos internos reutilizados para consistencia

### 2. UserRepository - Logging y Auditoría
- **Logging completo**: Todas las operaciones registradas con detalles
- **Búsquedas especializadas**: Métodos para búsqueda por username y por ID
- **Actualización dinámica**: Uso de `setattr()` para flexibilidad
- **Auditoría de operaciones**: Registro de éxitos, fallos y conteos

### 3. Manejo de Sesiones (Ambos Repositorios)
- **Inyección de dependencias**: Reciben sesión como parámetro
- **No gestión de ciclo de vida**: No abren ni cierran sesiones
- **Reutilización**: Una sesión puede usarse para múltiples operaciones

### 4. Gestión de Transacciones
- **Commits explícitos**: Cada operación de escritura incluye commit
- **Atomicidad**: Operaciones individuales son atómicas
- **Refresh**: Sincronización post-commit para obtener datos actualizados

### 5. Manejo de Errores
- **Verificación de existencia**: Valida existencia antes de update/delete
- **Retorno consistente**: None para recursos no encontrados
- **Operaciones seguras**: No fallan si el recurso no existe

### 6. Reutilización de Código
- **DRY**: Los métodos de update/delete reutilizan métodos de búsqueda
- **Consistencia**: Patrón uniforme en ambos repositorios
- **Mantenibilidad**: Cambios en búsqueda se propagan automáticamente

## Ejemplos de Uso

### BookRepository - Uso Básico
```python
# Crear repositorio con sesión
repository = BookRepository(db_session)

# Crear nuevo libro
book_data = {
    "title": "Nuevo Libro",
    "author": "Autor Ejemplo",
    "published_date": "2023-12-25"
}
new_book = repository.create_book(book_data)
print(f"Libro creado con ID: {new_book.id}")

# Buscar libro
book = repository.get_book_by_id(1)
if book:
    print(f"Libro encontrado: {book.title}")

# Actualizar libro
update_data = {"title": "Título Actualizado"}
updated_book = repository.update_book(1, update_data)

# Eliminar libro
deleted_book = repository.delete_book(1)
```

### UserRepository - Uso con Logging
```python
# Crear repositorio con sesión
repository = UserRepository(db_session)

# Buscar usuario por username (con logging automático)
user = repository.get_by_username("usuario123")
# Log: "Buscando usuario en repositorio: usuario123"
# Log: "Usuario encontrado en repositorio: usuario123" (si existe)

# Crear nuevo usuario
new_user = repository.create_user("nuevo_usuario", "hashed_password")
# Log: "Creando usuario en repositorio: nuevo_usuario"
# Log: "Usuario creado en repositorio: nuevo_usuario (ID: 1)"

# Obtener todos los usuarios
all_users = repository.get_all()
# Log: "Obteniendo todos los usuarios en repositorio"
# Log: "5 usuarios obtenidos en repositorio" (ejemplo)

# Actualizar usuario
update_data = {"username": "username_actualizado"}
updated_user = repository.update_user(1, update_data)
# Log: "Actualizando usuario en repositorio: username_original"
# Log: "Usuario actualizado en repositorio: username_actualizado"
```

### UserRepository - Actualización Dinámica
```python
# El método update_user puede actualizar cualquier campo
user_data = {
    "username": "nuevo_username",
    "password": "nueva_password_hasheada"
}

# El repositorio usa setattr() para actualizar dinámicamente
updated_user = repository.update_user(1, user_data)

# Equivale a:
# if hasattr(user, 'username'):
#     user.username = "nuevo_username"
# if hasattr(user, 'password'):
#     user.password = "nueva_password_hasheada"
```

## Sistema de Logging en UserRepository

### Configuración
```python
import logging

logger = logging.getLogger(__name__)
```

### Tipos de Logs Generados

#### Logs de Información (`logger.info`)
```python
# Búsquedas
"Buscando usuario en repositorio: username"
"Buscando usuario por ID en repositorio: 1"
"Usuario encontrado en repositorio: username"

# Operaciones CRUD
"Creando usuario en repositorio: username"
"Usuario creado en repositorio: username (ID: 1)"
"Actualizando usuario en repositorio: username"
"Usuario actualizado en repositorio: username"
"Eliminando usuario en repositorio: username"
"Usuario eliminado en repositorio: username"

# Consultas masivas
"Obteniendo todos los usuarios en repositorio"
"5 usuarios obtenidos en repositorio"
```

#### Logs de Advertencia (`logger.warning`)
```python
# Búsquedas fallidas
"Usuario no encontrado en repositorio: username_inexistente"
"Usuario con ID 999 no encontrado en repositorio"
```

### Beneficios del Logging
1. **Auditoría completa**: Registro de todas las operaciones de datos
2. **Debugging**: Facilita identificación de problemas
3. **Monitoreo**: Seguimiento de uso y patrones de acceso
4. **Seguridad**: Registro de operaciones críticas como creación/eliminación

## Estructura de Archivos de la Carpeta Repositories

```
repositories/
├── __init__.py              # Marca el directorio como paquete Python
├── book_repository.py       # Repositorio para operaciones CRUD de libros
├── user_repository.py       # Repositorio para operaciones CRUD de usuarios con logging
└── README_Repository.md     # Esta documentación
```

## Ventajas del Diseño

### BookRepository
1. **Simplicidad**: Implementación directa sin complejidad innecesaria
2. **Eficiencia**: Operaciones optimizadas para rendimiento
3. **Seguridad**: Copia defensiva protege datos originales
4. **Consistencia**: Patrón uniforme en todos los métodos

### UserRepository
1. **Auditabilidad**: Logging completo de todas las operaciones
2. **Flexibilidad**: Búsquedas por múltiples criterios (ID, username)
3. **Dinamismo**: Actualización flexible de cualquier campo
4. **Trazabilidad**: Registro detallado para debugging y monitoreo

### Diseño General
1. **Responsabilidad única**: Cada repositorio maneja solo acceso a datos
2. **Testabilidad**: Inyección de dependencias facilita testing
3. **Reutilización**: Métodos reutilizables en diferentes contextos
4. **Mantenibilidad**: Código claro y bien estructurado
5. **Escalabilidad**: Fácil agregar nuevos repositorios siguiendo el patrón

## Integración con la Arquitectura

### Relación con Servicios
```python
# En BookService
def __init__(self, db_session: Session):
    self.book_repository = BookRepository(db_session)

# En UserService
def __init__(self, db_session: Session):
    self.user_repository = UserRepository(db_session)
```

### Flujo de Datos
1. **Controller** recibe request HTTP
2. **Service** procesa lógica de negocio y llama repositorio
3. **Repository** maneja persistencia de datos con logging (UserRepository)
4. **Model** representa estructura de datos
5. **Database** almacena información

### Uso desde Servicios
```python
# BookService usando BookRepository
def create_book(self, book_data):
    return self.book_repository.create_book(book_data)

# UserService usando UserRepository con logging automático
def authenticate(self, username, password):
    user = self.user_repository.get_by_username(username)  # Log automático
    # Lógica de autenticación...
```

## Principios de Diseño Aplicados

### 1. Single Responsibility Principle (SRP)
- **BookRepository**: Solo maneja persistencia de libros
- **UserRepository**: Solo maneja persistencia de usuarios con auditoría

### 2. Open/Closed Principle (OCP)
- Abiertos para extensión (nuevos métodos de consulta)
- Cerrados para modificación (interfaz estable)

### 3. Dependency Inversion Principle (DIP)
- Dependen de abstracciones (Session interface)
- No dependen de implementaciones específicas de base de datos

### 4. Don't Repeat Yourself (DRY)
- Reutilización de métodos de búsqueda en operaciones de update/delete
- Patrones consistentes entre repositorios

### 5. Separation of Concerns
- **BookRepository**: Enfoque en operaciones CRUD simples
- **UserRepository**: Enfoque en operaciones CRUD con auditoría
- Logging separado de lógica de persistencia