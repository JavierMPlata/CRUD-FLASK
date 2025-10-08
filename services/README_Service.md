# Servicios (Services)

Este módulo implementa la capa de servicios que maneja la lógica de negocio de la aplicación. Actúa como intermediario entre los controladores y los repositorios, centralizando las reglas de negocio y coordinando las operaciones.

## Servicios Disponibles

### 1. Book Service (`book_service.py`)
Servicio para la gestión de libros con operaciones CRUD básicas.

### 2. User Service (`user_service.py`)
Servicio para la gestión de usuarios con autenticación, hashing de contraseñas y validación de credenciales.

## Capa de Servicios

### Propósito en la Arquitectura
La capa de servicios tiene las siguientes responsabilidades:
- **Lógica de negocio**: Implementa las reglas y procesos de negocio
- **Coordinación**: Orquesta operaciones entre múltiples repositorios
- **Abstracción**: Proporciona una interfaz simplificada a los controladores
- **Transacciones**: Maneja transacciones complejas que involucran múltiples entidades
- **Seguridad**: Manejo de autenticación y hashing de contraseñas
- **Logging**: Sistema de auditoría y debugging

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
- **Simplicidad**: Implementación directa con delegación al repositorio

### Patrón de Diseño
- **Service Layer Pattern**: Encapsula lógica de negocio
- **Facade Pattern**: Simplifica interacción con subsistemas
- **Delegation Pattern**: Delega operaciones específicas al repositorio

## Clase UserService

### Estructura y Dependencias
```python
from repositories.user_repository import UserRepository
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import Session
import logging

class UserService:
    def __init__(self, db_session: Session):
        self.user_repository = UserRepository(db_session)
```

**Características:**
- **Inyección de dependencias**: Recibe sesión de base de datos
- **Seguridad integrada**: Manejo de hashing de contraseñas con Werkzeug
- **Logging completo**: Sistema de auditoría para todas las operaciones
- **Validación de negocio**: Verificación de usuarios duplicados
- **Encapsulación del repositorio**: Maneja instancia de UserRepository

### Características de Seguridad
- **Hashing de contraseñas**: Utiliza `generate_password_hash()` de Werkzeug
- **Verificación segura**: Usa `check_password_hash()` para autenticación
- **Validación de duplicados**: Evita registros de usuarios existentes
- **Logging de seguridad**: Auditoría completa de operaciones de autenticación

## BookService - Métodos del Servicio

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

**Retorna:**
- `List[Book]`: Lista completa de libros

### 2. `get_book_by_id(book_id: int)` - Obtener Libro por ID
```python
def get_book_by_id(self, book_id: int):
    return self.book_repository.get_book_by_id(book_id)
```

**Funcionalidad:**
- Búsqueda individual por identificador
- Validación implícita de existencia
- Base para operaciones más complejas

**Parámetros:**
- `book_id (int)`: Identificador único del libro

**Retorna:**
- `Book | None`: Libro encontrado o None

### 3. `create_book(book_data: dict)` - Crear Nuevo Libro
```python
def create_book(self, book_data: dict):
    return self.book_repository.create_book(book_data)
```

**Funcionalidad:**
- Creación de nuevos libros en el sistema
- Delegación directa al repositorio
- Punto de extensión para validaciones de negocio

**Parámetros:**
- `book_data (dict)`: Datos del libro a crear

**Retorna:**
- `Book`: Libro creado con ID asignado

### 4. `update_book(book_id: int, book_data: dict)` - Actualizar Libro
```python
def update_book(self, book_id: int, book_data: dict):
    return self.book_repository.update_book(book_id, book_data)
```

**Funcionalidad:**
- Actualización de libros existentes
- Validación implícita de existencia
- Preservación de integridad de datos

**Parámetros:**
- `book_id (int)`: ID del libro a actualizar
- `book_data (dict)`: Datos a actualizar

**Retorna:**
- `Book | None`: Libro actualizado o None si no existe

### 5. `delete_book(book_id: int)` - Eliminar Libro
```python
def delete_book(self, book_id: int):
    return self.book_repository.delete_book(book_id)
```

**Funcionalidad:**
- Eliminación de libros del sistema
- Validación de existencia antes de eliminar
- Operación irreversible (en implementación actual)

**Parámetros:**
- `book_id (int)`: ID del libro a eliminar

**Retorna:**
- `Book | None`: Libro eliminado o None si no existía

## UserService - Métodos del Servicio

### 1. `register_user(username: str, password: str)` - Registrar Usuario
```python
def register_user(self, username: str, password: str):
```

**Funcionalidad:**
- Registra un nuevo usuario en el sistema
- **Validación de duplicados**: Verifica si el usuario ya existe
- **Hashing automático**: Genera hash seguro de la contraseña
- **Logging completo**: Auditoría de todo el proceso

**Parámetros:**
- `username (str)`: Nombre de usuario
- `password (str)`: Contraseña en texto plano

**Retorna:**
- `User`: Usuario creado exitosamente
- `dict`: `{'error': 'Usuario ya existe', 'username': username}` si existe

**Ejemplo de respuesta de error:**
```python
{'error': 'Usuario ya existe', 'username': 'usuario_existente'}
```

### 2. `authenticate(username: str, password: str)` - Autenticar Usuario
```python
def authenticate(self, username: str, password: str):
```

**Funcionalidad:**
- Autentica un usuario verificando sus credenciales
- **Verificación segura**: Usa `check_password_hash()` para validar
- **Logging de seguridad**: Registra intentos exitosos y fallidos
- **Protección contra ataques**: Manejo seguro de contraseñas

**Parámetros:**
- `username (str)`: Nombre de usuario
- `password (str)`: Contraseña en texto plano

**Retorna:**
- `User`: Usuario autenticado si las credenciales son válidas
- `None`: Si las credenciales son inválidas

### 3. `get_user_by_id(user_id: int)` - Obtener Usuario por ID
```python
def get_user_by_id(self, user_id: int):
```

**Funcionalidad:**
- Obtiene un usuario por su ID
- Logging de la operación para auditoría

**Parámetros:**
- `user_id (int)`: ID del usuario

**Retorna:**
- `User`: Usuario encontrado o None

### 4. `get_user_by_username(username: str)` - Obtener Usuario por Username
```python
def get_user_by_username(self, username: str):
```

**Funcionalidad:**
- Obtiene un usuario por su nombre de usuario
- Útil para validaciones y búsquedas

**Parámetros:**
- `username (str)`: Nombre de usuario

**Retorna:**
- `User`: Usuario encontrado o None

### 5. `get_all_users()` - Obtener Todos los Usuarios
```python
def get_all_users(self):
```

**Funcionalidad:**
- Obtiene todos los usuarios del sistema
- Logging del conteo de usuarios obtenidos

**Retorna:**
- `List[User]`: Lista de todos los usuarios

### 6. `update_user(user_id: int, user_data: dict)` - Actualizar Usuario
```python
def update_user(self, user_id: int, user_data: dict):
```

**Funcionalidad:**
- Actualiza un usuario existente
- **Hashing automático**: Si se actualiza la contraseña, la hashea automáticamente
- **Seguridad**: Protege nuevas contraseñas con hash

**Parámetros:**
- `user_id (int)`: ID del usuario a actualizar
- `user_data (dict)`: Datos a actualizar (si incluye 'password', se hashea)

**Retorna:**
- `User`: Usuario actualizado o None si no existe

### 7. `delete_user(user_id: int)` - Eliminar Usuario
```python
def delete_user(self, user_id: int):
```

**Funcionalidad:**
- Elimina un usuario del sistema
- Logging de la operación para auditoría

**Parámetros:**
- `user_id (int)`: ID del usuario a eliminar

**Retorna:**
- `User`: Usuario eliminado o None si no existía

## Características del Diseño Actual

### 1. BookService - Simplicidad y Preparación
- **Implementación directa**: Delegación simple al repositorio
- **Sin complejidad innecesaria**: No incluye lógica no requerida
- **Fácil comprensión**: Código claro y directo
- **Extensibilidad**: Cada método puede evolucionar independientemente

### 2. UserService - Seguridad y Auditoría
- **Seguridad robusta**: Hashing automático de contraseñas con Werkzeug
- **Logging completo**: Auditoría de todas las operaciones críticas
- **Validación de negocio**: Prevención de usuarios duplicados
- **Manejo de errores**: Respuestas estructuradas para diferentes escenarios

### 3. Consistencia entre Servicios
- **Interfaz uniforme**: Ambos servicios siguen patrones consistentes
- **Inyección de dependencias**: Mismo patrón de inicialización
- **Manejo de errores**: Comportamiento consistente con valores de retorno
- **Naming convention**: Nombres descriptivos y consistentes

## Ejemplos de Uso

### BookService - Uso en Controladores
```python
# En book_controller.py
service = BookService(get_db_session())

@book_bp.route('/books', methods=['POST'])
@jwt_required()
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

### UserService - Registro de Usuario
```python
# En user_controller.py
service = UserService(get_db_session())

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # El servicio maneja la validación de duplicados y hashing
    user = service.register_user(username, password)
    
    # Verificar si hubo error (usuario ya existe)
    if isinstance(user, dict) and user.get('error') == 'Usuario ya existe':
        return jsonify({'error': 'Usuario ya existe'}), 409
        
    return jsonify({
        'message': 'Usuario registrado exitosamente',
        'user': user.to_dict()
    }), 201
```

### UserService - Autenticación
```python
# En user_controller.py
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # El servicio maneja la verificación segura de contraseñas
    user = service.authenticate(username, password)
    
    if user:
        # Generar JWT token
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'message': 'Login exitoso',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
    else:
        return jsonify({'error': 'Credenciales inválidas'}), 401
```

## Sistema de Logging en UserService

### Operaciones Registradas
```python
# Ejemplo de logs generados automáticamente:

# Registro exitoso
logger.info('Registrando usuario en servicio: nuevo_usuario')
logger.info('Contraseña hasheada para usuario: nuevo_usuario')
logger.info('Usuario creado en servicio: nuevo_usuario (ID: 1)')

# Intento de registro duplicado
logger.warning('Intento de registro con usuario existente: usuario_existente')

# Autenticación exitosa
logger.info('Autenticando usuario en servicio: usuario123')
logger.info('Autenticación exitosa en servicio: usuario123')

# Autenticación fallida
logger.warning('Autenticación fallida en servicio: usuario_malo')

# Consultas
logger.info('Obteniendo usuario por ID en servicio: 1')
logger.info('Obteniendo todos los usuarios en servicio')
logger.info('5 usuarios obtenidos en servicio')
```

### Configuración de Logging
```python
import logging

logger = logging.getLogger(__name__)

# Los logs se integran con el sistema de logging de la aplicación
# Configurado en config/database.py
```

## Seguridad en UserService

### Hashing de Contraseñas
```python
from werkzeug.security import generate_password_hash, check_password_hash

# Registro: hash automático
hashed_password = generate_password_hash(password)

# Autenticación: verificación segura
if user and check_password_hash(user.password, password):
    return user
```

### Características de Seguridad
- **Salt automático**: Werkzeug genera salt único para cada contraseña
- **Algoritmo seguro**: Utiliza pbkdf2:sha256 por defecto
- **Resistente a ataques**: Protección contra rainbow tables y fuerza bruta
- **No almacenamiento de texto plano**: Las contraseñas nunca se guardan sin hash

## Estructura de Archivos de la Carpeta Services

```
services/
├── __init__.py              # Marca el directorio como paquete Python
├── book_service.py          # Servicio para operaciones CRUD de libros
├── user_service.py          # Servicio para autenticación y gestión de usuarios
└── README_Service.md        # Esta documentación
```

## Ventajas de la Implementación

### BookService
1. **Preparación para el futuro**: Estructura lista para lógica de negocio compleja
2. **Testabilidad**: Cada método puede ser testeado independientemente
3. **Mantenibilidad**: Cambios localizados no afectan otros componentes
4. **Consistencia**: Interfaz uniforme para operaciones CRUD

### UserService
1. **Seguridad robusta**: Hashing y verificación automática de contraseñas
2. **Auditabilidad**: Logging completo de operaciones críticas
3. **Validación de negocio**: Prevención proactiva de problemas
4. **Manejo de errores**: Respuestas estructuradas y diferenciadas
5. **Escalabilidad**: Preparado para funcionalidades adicionales de usuarios

### Diseño General
1. **Separación de responsabilidades**: Cada servicio maneja su dominio específico
2. **Reutilización**: Servicios pueden ser utilizados por múltiples controladores
3. **Extensibilidad**: Fácil agregar nuevos servicios siguiendo el mismo patrón
4. **Integración**: Compatibilidad completa con la arquitectura de la aplicación

## Integración con la Arquitectura Completa

### Relación con Repositorios
```python
# BookService
def __init__(self, db_session: Session):
    self.book_repository = BookRepository(db_session)

# UserService  
def __init__(self, db_session: Session):
    self.user_repository = UserRepository(db_session)
```

### Uso desde Controladores
```python
# Instanciación de servicios con sesión de BD
book_service = BookService(get_db_session())
user_service = UserService(get_db_session())

# Los controladores delegan la lógica de negocio a los servicios
# Los servicios coordinan las operaciones con los repositorios
```

## Principios de Diseño Aplicados

### 1. Single Responsibility Principle (SRP)
- **BookService**: Solo maneja lógica de negocio de libros
- **UserService**: Solo maneja lógica de negocio de usuarios y autenticación

### 2. Open/Closed Principle (OCP)
- Abiertos para extensión (agregar lógica de negocio)
- Cerrados para modificación (interfaz estable)

### 3. Dependency Inversion Principle (DIP)
- Dependen de abstracciones (Repository interfaces)
- No dependen de implementaciones concretas de base de datos

### 4. Security by Design
- **UserService**: Seguridad integrada desde el diseño
- Hashing automático y verificación segura
- Auditoría completa de operaciones críticas

### 5. Don't Repeat Yourself (DRY)
- Reutilización de repositorios en todos los métodos
- Patrones consistentes entre servicios
- Lógica centralizada para operaciones similares