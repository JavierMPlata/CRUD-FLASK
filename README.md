# 📚 API CR## 🚀 Características

- ✅ **API REST completa** con operaciones CRUD
- 🔐 **Autenticación JWT** segura para todos los endpoints de libros
- 👤 **Sistema de usuarios** con registro y login
- 📖 **Gestión de libros** completa (título, autor, fecha de publicación, editorial, género, idioma, páginas, ISBN)
- 🏗️ **Arquitectura modular** con separación de responsabilidades (MVC + Service/Repository)
- 🗄️ **Base de datos dual** (MySQL primaria + SQLite fallback automático)
- 📝 **Validación de datos** robusta con modelos tipados
- 🎯 **Respuestas JSON** consistentes y estructuradas
- 📊 **Manejo de errores** centralizado con mensajes informativos
- 🛡️ **Seguridad implementada** (contraseñas hasheadas, tokens JWT, validación de datos)
- 🔧 **## 🔧 Tecnologías

- **[Flask](https://flask.palletsprojects.com/)**: Framework web minimalista de Python
- **[Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)**: Manejo de autenticación JWT
- **[Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)**: ORM integrado con Flask
- **[SQLAlchemy](https://www.sqlalchemy.org/)**: ORM para Python y manejo de base de datos
- **[Bcrypt](https://pypi.org/project/bcrypt/)**: Hashing seguro de contraseñas
- **[PyMySQL](https://pypi.org/project/PyMySQL/)**: Conector MySQL para Python
- **[Python-dotenv](https://pypi.org/project/python-dotenv/)**: Gestión de variables de entorno
- **[Gunicorn](https://gunicorn.org/)**: Servidor WSGI para producción
- **[Flasgger](https://github.com/flasgger/flasgger)**: Documentación automática Swagger (preparado)
- **[PyYAML](https://pypi.org/project/PyYAML/)**: Procesamiento de archivos YAML
- **[Werkzeug](https://werkzeug.palletsprojects.com/)**: Utilidades WSGI para Flask
- **Python 3.8+**: Lenguaje de programación
- **JSON**: Formato de intercambio de datos
- **RESTful API**: Arquitectura de servicios web
- **JWT**: JSON Web Tokens para autenticación
- **Railway**: Plataforma de despliegue cloudón flexible** para diferentes entornos de desarrollo
- 🚄 **Railway deployment** optimizado para producción
- 📚 **Documentación modular** con README específicos por módulo
- 🌍 **Variables de entorno** con archivo .env para configuración segura
- ⚡ **Servidor de producción** con Gunicorn incluido
- 🔄 **Configuración automática** de base de datos según disponibilidadcon Autenticación JWT - Flask

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.21-red.svg)](https://www.sqlalchemy.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-JavierMPlata-black.svg)](https://github.com/JavierMPlata)

Una API REST completa desarrollada con Flask para gestionar libros con autenticación JWT, implementando operaciones CRUD (Create, Read, Update, Delete) con una arquitectura modular y escalable.

## 🚀 Características

- ✅ **API REST completa** con operaciones CRUD
- � **Autenticación JWT** segura para todos los endpoints de libros
- 👤 **Sistema de usuarios** con registro y login
- �📖 **Gestión de libros** completa (título, autor, fecha de publicación, editorial, género, idioma, páginas, ISBN)
- 🏗️ **Arquitectura modular** con separación de responsabilidades (MVC + Service/Repository)
- 🗄️ **Integración con SQLAlchemy** para manejo de base de datos
- 📝 **Validación de datos** robusta con modelos tipados
- 🎯 **Respuestas JSON** consistentes y estructuradas
- 📊 **Manejo de errores** centralizado
- 🛡️ **Seguridad implementada** (contraseñas hasheadas, tokens JWT, validación de datos)
- 🔧 **Configuración flexible** para diferentes entornos de desarrollo

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Autenticación JWT](#autenticación-jwt)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Flujo de Autenticación Completo](#flujo-de-autenticación-completo)
- [Operaciones CRUD de Libros](#operaciones-crud-de-libros)
- [Manejo de Errores](#manejo-de-errores)
- [Seguridad](#seguridad)
- [Tecnologías](#tecnologías)
- [Testing](#testing)
- [Despliegue](#despliegue)
- [Contribución](#contribución)
- [Roadmap](#roadmap)

## 🛠️ Instalación

### Prerrequisitos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Pasos de instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/JavierMPlata/CRUD-FLASK.git
cd CRUD-FLASK
```

2. **Crea un entorno virtual (recomendado):**
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

3. **Instala las dependencias:**
```bash
pip install -r requirements.txt
```

4. **Configura las variables de entorno:**

   **Opción A: Desarrollo Local (SQLite automático)**
   ```bash
   # No requiere configuración adicional
   # SQLite se usa automáticamente como fallback
   ```

   **Opción B: Con MySQL personalizado**
   ```bash
   # Crea archivo .env en la raíz del proyecto
   echo "MYSQL_URI=mysql+pymysql://usuario:contraseña@localhost:3306/tu_base_datos" > .env
   echo "JWT_SECRET_KEY=tu_clave_secreta_jwt" >> .env
   ```

   **Opción C: Railway/Producción**
   ```bash
   # Las variables se configuran automáticamente por Railway
   # Solo necesitas configurar JWT_SECRET_KEY si no está definida
   echo "JWT_SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')" > .env
   ```

5. **Ejecuta la aplicación:**
```bash
python main.py
```

La aplicación estará disponible en `http://localhost:5000`

### 🔧 Configuración Avanzada

#### Para desarrollo con MySQL local:
```bash
# 1. Instalar MySQL y crear base de datos
# 2. Configurar .env con credenciales
MYSQL_URI=mysql+pymysql://root:password@localhost:3306/crud_flask_db
JWT_SECRET_KEY=your-development-jwt-key

# 3. Ejecutar aplicación
python main.py
```

#### Para Railway deployment:
```bash
# 1. Railway detecta automáticamente el proyecto Flask
# 2. Variables de entorno se configuran automáticamente
# 3. Base de datos MySQL se provisiona automáticamente
# 4. Despliegue automático desde GitHub
```

## 📁 Estructura del Proyecto

```
CRUD-FLASK/
├── .env                     # Variables de entorno (configuración MySQL/Railway)
├── .gitignore              # Archivos ignorados por Git
├── .venv/                  # Entorno virtual de Python
├── config/                 # Configuraciones de la aplicación
│   ├── __init__.py        # Inicialización del módulo
│   ├── database.py        # Configuración dual MySQL/SQLite con fallback
│   ├── README_Config.md   # Documentación de configuraciones
│   └── __pycache__/       # Archivos compilados de Python
├── controllers/           # Controladores - manejo de rutas HTTP
│   ├── __init__.py       # Inicialización del módulo
│   ├── book_controller.py # Controlador de libros con autenticación JWT
│   ├── user_controller.py # Controlador de usuarios y autenticación
│   ├── README_Controller.md # Documentación de controladores
│   └── __pycache__/      # Archivos compilados de Python
├── models/               # Modelos de datos con SQLAlchemy
│   ├── __init__.py      # Inicialización del módulo
│   ├── book_model.py    # Modelo Book con definición de tabla
│   ├── user_model.py    # Modelo User para autenticación
│   ├── db.py           # Configuración base de SQLAlchemy
│   ├── README_Model.md # Documentación de modelos
│   └── __pycache__/    # Archivos compilados de Python
├── repositories/        # Capa de acceso a datos
│   ├── __init__.py     # Inicialización del módulo
│   ├── book_repository.py # Repositorio de libros (CRUD operations)
│   ├── user_repository.py # Repositorio de usuarios
│   ├── README_Repository.md # Documentación de repositorios
│   └── __pycache__/    # Archivos compilados de Python
├── services/           # Lógica de negocio
│   ├── __init__.py    # Inicialización del módulo
│   ├── book_service.py # Servicios de negocio para libros
│   ├── user_service.py # Servicios de autenticación y usuarios
│   ├── README_Service.md # Documentación de servicios
│   └── __pycache__/   # Archivos compilados de Python
├── instance/          # Directorio de instancia de Flask (SQLite por defecto)
├── main.py           # Punto de entrada principal con configuración JWT
├── requirements.txt  # Dependencias del proyecto (actualizado)
├── README.md        # Documentación principal del proyecto
└── LICENSE         # Licencia del proyecto
```

### Arquitectura

El proyecto sigue una **arquitectura en capas** con separación clara de responsabilidades:

- **Models**: Definen la estructura de datos y mapeo con SQLAlchemy
- **Controllers**: Manejan las peticiones HTTP y respuestas (capa de presentación)
- **Services**: Contienen la lógica de negocio y validaciones
- **Repositories**: Capa de acceso a datos y operaciones de base de datos
- **Config**: Configuraciones para base de datos y diferentes entornos

### 📚 Documentación Modular

El proyecto incluye documentación detallada en cada módulo:

| Archivo | Ubicación | Descripción |
|---------|-----------|-------------|
| `README_Config.md` | `/config/` | Configuración de base de datos, entornos y variables |
| `README_Controller.md` | `/controllers/` | Documentación de endpoints, rutas y manejo HTTP |
| `README_Model.md` | `/models/` | Modelos de datos, relaciones y esquemas SQLAlchemy |
| `README_Repository.md` | `/repositories/` | Operaciones CRUD y acceso a datos |
| `README_Service.md` | `/services/` | Lógica de negocio y validaciones |

**Características de la documentación:**
- **Ejemplos de código**: Snippets funcionales en cada módulo
- **Diagramas de arquitectura**: Visualización de flujos de datos
- **Casos de uso**: Implementaciones específicas por módulo
- **Best practices**: Patrones y convenciones del proyecto
- **Troubleshooting**: Solución de problemas comunes

## 🗄️ Configuración de Base de Datos

### Configuración Dual (MySQL + SQLite)

La aplicación implementa un sistema de base de datos dual con fallback automático:

#### 🥇 **MySQL (Primaria)**
- **Uso**: Producción, Railway deployment, desarrollo avanzado
- **Configuración**: Via variable `MYSQL_URI` en archivo `.env`
- **Formato**: `mysql+pymysql://user:password@host:port/database`
- **Ventajas**: Escalabilidad, rendimiento, características avanzadas

#### 🥈 **SQLite (Fallback)**
- **Uso**: Desarrollo local, testing, backup automático
- **Configuración**: Automática si MySQL no está disponible
- **Archivo**: `instance/books_users.db`
- **Ventajas**: Sin configuración, portable, ideal para desarrollo

### Flujo de Configuración Automática

```python
# La aplicación detecta automáticamente la configuración disponible
mysql_uri = os.getenv('MYSQL_URI')
if mysql_uri:
    app.config['SQLALCHEMY_DATABASE_URI'] = mysql_uri
    logging.info("Usando configuración MySQL")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books_users.db'
    logging.info("Usando configuración SQLite como fallback")
```

### Railway Database Integration

- **Proveedor**: Railway PostgreSQL/MySQL
- **Configuración**: Variables de entorno automáticas
- **SSL**: Soporte automático para conexiones seguras
- **Escalabilidad**: Automática según plan de Railway

## ⚙️ Configuración

### Configuraciones disponibles

- **Development**: Para desarrollo local (modo debug activado)
- **Production**: Para producción (optimizado y seguro)
- **Testing**: Para pruebas unitarias

### Variables de entorno

El proyecto utiliza un archivo `.env` para configurar las variables de entorno. Puedes configurar las siguientes variables:

**Configuración de Base de Datos:**
```bash
# Configuración MySQL (Producción - Railway)
MYSQL_URI=mysql+pymysql://user:password@host:port/database

# Variables individuales de MySQL (alternativa)
db_name=tu_base_de_datos
db_user=tu_usuario
db_password=tu_contraseña
db_host=tu_host
db_port=tu_puerto
```

**Configuración de la Aplicación:**
```bash
FLASK_ENV=development          # Entorno de ejecución
FLASK_DEBUG=True              # Modo debug
SECRET_KEY=your-secret-key    # Clave secreta para Flask
JWT_SECRET_KEY=jwt-secret-key # Clave secreta para JWT
CORS_ENABLED=True             # Habilitar CORS
```

**Características de Configuración:**

1. **Base de Datos Dual**: 
   - **MySQL primario**: Para producción y Railway deployment
   - **SQLite fallback**: Automático si MySQL no está disponible
   - **Configuración automática**: La aplicación detecta y usa la configuración disponible

2. **Archivo .env**: 
   - **Variables sensibles**: Credenciales de base de datos seguras
   - **Configuración flexible**: Diferentes entornos con el mismo código
   - **Railway integration**: Configuración optimizada para despliegue

3. **Seguridad**:
   - **Credenciales protegidas**: Nunca en el código fuente
   - **Archivo .env ignorado**: Por Git para proteger datos sensibles

## 🔐 Autenticación JWT

### Características de Seguridad

La API implementa un sistema de autenticación JWT robusto con las siguientes características:

1. **Contraseñas hasheadas**: Nunca se almacenan en texto plano
2. **Tokens JWT**: Autenticación stateless y segura
3. **Validación de datos**: Verificación de entrada en todos los endpoints
4. **Logging de seguridad**: Registro de intentos de autenticación
5. **Manejo de errores**: Respuestas consistentes para errores de autenticación

### Configuración JWT

- **JWT Secret Key**: Configurable vía variable de entorno `JWT_SECRET_KEY`
- **Expiración de tokens**: Por defecto 1 día (configurable)
- **Headers seguros**: Validación de formato de Authorization header

### Flujo de Autenticación

Todos los endpoints de libros requieren autenticación JWT. El flujo básico es:

1. **Registrar usuario** → Crear cuenta nueva
2. **Iniciar sesión** → Obtener token JWT
3. **Usar token** → Incluir en header `Authorization: Bearer <token>` para todos los endpoints de libros

## 🎯 Uso

### Iniciar la aplicación

```bash
python main.py
```

El servidor se iniciará en `http://localhost:5000`

### Página de bienvenida

Visita `http://localhost:5000` para ver la información de la API y endpoints disponibles.

## 🔌 Endpoints de la API

### Endpoints de Autenticación

**Base URL:** `http://localhost:5000/auth`

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/register` | ❌ No | Registrar nuevo usuario |
| `POST` | `/login` | ❌ No | Iniciar sesión y obtener token JWT |
| `GET` | `/profile` | ✅ JWT | Obtener perfil del usuario autenticado |
| `GET` | `/users` | ✅ JWT | Listar todos los usuarios |

### Endpoints de Libros

**Base URL:** `http://localhost:5000/app`

**⚠️ IMPORTANTE:** Todos los endpoints de libros requieren autenticación JWT

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `GET` | `/books` | ✅ JWT | Obtener todos los libros |
| `GET` | `/books/<id>` | ✅ JWT | Obtener un libro por ID |
| `POST` | `/books` | ✅ JWT | Crear un nuevo libro |
| `PUT` | `/books/<id>` | ✅ JWT | Actualizar un libro existente |
| `DELETE` | `/books/<id>` | ✅ JWT | Eliminar un libro |

### Formato de Autenticación

Para endpoints que requieren JWT, incluye el header:
```
Authorization: Bearer <tu_access_token>
```

### Estructura del objeto Book

```json
{
  "id": 1,
  "title": "Título del libro",
  "author": "Nombre del autor",
  "published_date": "2023-01-01T00:00:00",
  "editorials": "Editorial",
  "gender": "Género literario",
  "language": "Idioma",
  "pages": "Número de páginas",
  "isbn": "ISBN del libro"
}
```

## 💡 Ejemplos de Uso

## 🔐 Flujo de Autenticación Completo

### Paso 1: Registrar un usuario

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario123",
    "password": "contraseña123"
  }'
```

**Respuesta:**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "username": "usuario123"
  }
}
```

### Paso 2: Iniciar sesión y obtener token JWT

```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario123",
    "password": "contraseña123"
  }'
```

**Respuesta:**
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

**⚠️ IMPORTANTE:** Guarda el `access_token` de la respuesta. Lo necesitarás para todas las operaciones de libros.

## 📖 Operaciones CRUD de Libros

Todos los siguientes endpoints requieren el header: `Authorization: Bearer <tu_access_token>`

### 1. Obtener todos los libros

```bash
curl -X GET http://localhost:5000/app/books \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

**Respuesta:**
```json
{
  "books": [
    {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "published_date": "1949-06-08T00:00:00",
      "editorials": "Secker & Warburg",
      "gender": "Dystopian Fiction",
      "language": "English",
      "pages": "328",
      "isbn": "978-0-452-28423-4"
    }
  ],
  "total": 1
}
```

### 2. Obtener un libro específico

```bash
curl -X GET http://localhost:5000/app/books/1 \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

**Respuesta:**
```json
{
  "message": "Libro encontrado",
  "book": {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "published_date": "1949-06-08T00:00:00",
    "editorials": "Secker & Warburg",
    "gender": "Dystopian Fiction",
    "language": "English",
    "pages": "328",
    "isbn": "978-0-452-28423-4"
  }
}
```

### 3. Crear un nuevo libro

```bash
curl -X POST http://localhost:5000/app/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
  -d '{
    "title": "El Quijote",
    "author": "Miguel de Cervantes",
    "published_date": "1605-01-16",
    "editorials": "Francisco de Robles",
    "gender": "Novela",
    "language": "Español",
    "pages": "863",
    "isbn": "978-84-376-0494-7"
  }'
```

**Respuesta:**
```json
{
  "message": "Libro creado exitosamente",
  "book": {
    "id": 2,
    "title": "El Quijote",
    "author": "Miguel de Cervantes",
    "published_date": "1605-01-16T00:00:00",
    "editorials": "Francisco de Robles",
    "gender": "Novela",
    "language": "Español",
    "pages": "863",
    "isbn": "978-84-376-0494-7"
  }
}
```

### 4. Actualizar un libro

```bash
curl -X PUT http://localhost:5000/app/books/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
  -d '{
    "title": "Don Quijote de la Mancha (Edición Completa)",
    "author": "Miguel de Cervantes Saavedra",
    "published_date": "1605-01-16",
    "editorials": "Francisco de Robles",
    "gender": "Novela Caballeresca",
    "language": "Español",
    "pages": "863",
    "isbn": "978-84-376-0494-7"
  }'
```

**Respuesta:**
```json
{
  "message": "Libro actualizado exitosamente",
  "book": {
    "id": 2,
    "title": "Don Quijote de la Mancha (Edición Completa)",
    "author": "Miguel de Cervantes Saavedra",
    "published_date": "1605-01-16T00:00:00",
    "editorials": "Francisco de Robles",
    "gender": "Novela Caballeresca",
    "language": "Español",
    "pages": "863",
    "isbn": "978-84-376-0494-7"
  }
}
```

### 5. Eliminar un libro

```bash
curl -X DELETE http://localhost:5000/app/books/2 \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

**Respuesta:**
```json
{
  "message": "Libro eliminado exitosamente",
  "deleted_book": {
    "id": 2,
    "title": "Don Quijote de la Mancha (Edición Completa)",
    "author": "Miguel de Cervantes Saavedra",
    "published_date": "1605-01-16T00:00:00",
    "editorials": "Francisco de Robles",
    "gender": "Novela Caballeresca",
    "language": "Español",
    "pages": "863",
    "isbn": "978-84-376-0494-7"
  }
}
```
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "published_date": "1949-06-08T00:00:00"
}
```

### 3. Crear un nuevo libro

```bash
curl -X POST http://localhost:5000/app/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "El Quijote",
    "author": "Miguel de Cervantes",
    "published_date": "1605-01-16"
  }'
```

**Respuesta:**
```json
{
  "id": 6,
  "title": "El Quijote",
  "author": "Miguel de Cervantes",
  "published_date": "1605-01-16T00:00:00"
}
```

### 4. Actualizar un libro

```bash
curl -X PUT http://localhost:5000/app/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984 (Edición Especial)",
    "author": "George Orwell",
    "published_date": "1949-06-08"
  }'
```

### 5. Eliminar un libro

```bash
curl -X DELETE http://localhost:5000/app/books/1
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

## 🛡️ Manejo de Errores

La API maneja varios tipos de errores:

### Errores comunes

- **400 Bad Request**: Datos inválidos o faltantes
- **401 Unauthorized**: Token JWT requerido o inválido
- **403 Forbidden**: Acceso denegado
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error interno del servidor

### Errores de Autenticación

#### Sin token JWT
```bash
curl -X GET http://localhost:5000/app/books
```

**Respuesta (401):**
```json
{
  "error": "Token requerido",
  "message": "Se requiere un token JWT para acceder a este endpoint. Usa: Authorization: Bearer <token>"
}
```

#### Token inválido
```bash
curl -X GET http://localhost:5000/app/books \
  -H "Authorization: Bearer token_invalido"
```

**Respuesta (401):**
```json
{
  "error": "Token inválido",
  "message": "El token JWT proporcionado es inválido."
}
```

#### Token expirado
**Respuesta (401):**
```json
{
  "error": "Token expirado",
  "message": "El token JWT ha expirado. Por favor, inicia sesión nuevamente."
}
```

### Ejemplo de respuesta de error

```json
{
  "error": "Book not found"
}
```

### Validaciones

#### Para libros:
- **Título**: Requerido, no puede estar vacío
- **Autor**: Requerido, no puede estar vacío
- **Fecha de publicación**: Opcional, debe ser una fecha válida
- **Editorial, Género, Idioma, Páginas, ISBN**: Opcionales

#### Para usuarios:
- **Username**: Requerido, único
- **Password**: Requerido, mínimo 6 caracteres

## �️ Seguridad

### Características de Seguridad Implementadas

1. **Contraseñas hasheadas**: Las contraseñas nunca se almacenan en texto plano usando hashing seguro
2. **Tokens JWT**: Autenticación stateless con JSON Web Tokens
3. **Validación de datos**: Verificación robusta de entrada en todos los endpoints
4. **Logging de seguridad**: Registro de intentos de autenticación y errores de seguridad
5. **Manejo de errores**: Respuestas consistentes que no exponen información sensible
6. **Headers seguros**: Validación del formato correcto de headers de autorización

### Configuración de Seguridad

- **JWT Secret Key**: Configurable vía variable de entorno `JWT_SECRET_KEY`
- **Expiración de tokens**: Por defecto 1 día, configurable según necesidades
- **Algoritmo de hashing**: Bcrypt para contraseñas
- **Validación de tokens**: Verificación automática en endpoints protegidos

### Usando Postman

#### 1. Configurar variables de entorno
- `base_url`: `http://localhost:5000`
- `jwt_token`: (se llenará automáticamente después del login)

#### 2. Request de Login
- **Método:** POST
- **URL:** `{{base_url}}/auth/login`
- **Body (JSON):**
```json
{
  "username": "usuario123",
  "password": "contraseña123"
}
```

#### 3. Script para guardar token automáticamente
En la pestaña "Tests" del request de login:
```javascript
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
    const responseJson = pm.response.json();
    pm.environment.set("jwt_token", responseJson.access_token);
});
```

#### 4. Configurar autorización para endpoints de libros
En todos los requests de libros:
- **Authorization Type:** Bearer Token
- **Token:** `{{jwt_token}}`

## �🔧 Tecnologías

- **[Flask](https://flask.palletsprojects.com/)**: Framework web minimalista de Python
- **[Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)**: Manejo de autenticación JWT
- **[SQLAlchemy](https://www.sqlalchemy.org/)**: ORM para Python y manejo de base de datos
- **[Bcrypt](https://pypi.org/project/bcrypt/)**: Hashing seguro de contraseñas
- **[PyMySQL](https://pypi.org/project/PyMySQL/)**: Conector MySQL para Python
- **Python 3.8+**: Lenguaje de programación
- **JSON**: Formato de intercambio de datos
- **RESTful API**: Arquitectura de servicios web
- **JWT**: JSON Web Tokens para autenticación

### Dependencias principales

```
Flask==2.3.3
Flask-JWT-Extended==4.5.2
Flask-SQLAlchemy==3.0.5
bcrypt==4.0.1
python-dotenv==1.0.0
SQLAlchemy==2.0.21
PyMySQL==1.1.0
Werkzeug==2.3.7
Gunicorn==21.2.0
Flasgger==0.9.7.1
PyYAML==6.0.1
```

**Nuevas dependencias añadidas:**

- **`python-dotenv`**: Gestión de variables de entorno desde archivo `.env`
- **`PyMySQL`**: Conector MySQL para Python con SQLAlchemy
- **`Gunicorn`**: Servidor WSGI para producción y despliegue
- **`Flasgger`**: Documentación automática de API con Swagger (preparado)
- **`PyYAML`**: Procesamiento de archivos YAML para configuraciones
- **`Werkzeug`**: Utilidades WSGI optimizadas para Flask

## 🧪 Testing

Para ejecutar la aplicación en modo de desarrollo:

```bash
# Activar el entorno virtual
# Windows
venv\Scripts\activate

# Ejecutar en modo debug
set FLASK_ENV=development
python main.py
```

## 🚀 Despliegue

### 🚄 Railway Deployment (Recomendado)

La aplicación está optimizada para despliegue en Railway con configuración automática:

#### Características Railway
- **Base de datos**: MySQL automática con Railway
- **Variables de entorno**: Configuración automática desde Railway
- **SSL**: Conexiones seguras automáticas
- **Escalabilidad**: Automática según demanda
- **CI/CD**: Despliegue automático desde GitHub

#### Configuración Railway
```bash
# Variables automáticas de Railway (no requieren configuración manual)
MYSQL_URI=mysql+pymysql://user:pass@host:port/db  # Auto-generada
RAILWAY_ENVIRONMENT=production                     # Auto-configurada
```

#### Comandos de despliegue
```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login y conectar proyecto
railway login
railway link

# 3. Configurar variables (opcional, Railway las maneja automáticamente)
railway variables set JWT_SECRET_KEY=your-super-secret-jwt-key

# 4. Desplegar
railway up
```

### 🐳 Despliegue Tradicional

#### Requisitos para producción

- Python 3.8+
- Base de datos MySQL (recomendado para producción)
- Servidor web (Gunicorn incluido)
- Variables de entorno configuradas

#### Configuración para producción

```bash
# Variables de entorno recomendadas
export FLASK_ENV=production
export FLASK_DEBUG=False
export SECRET_KEY=your-super-secret-production-key
export JWT_SECRET_KEY=your-super-secret-jwt-key
export MYSQL_URI=mysql+pymysql://user:pass@host:port/db
```

#### Ejecutar con Gunicorn
```bash
# Instalación
pip install gunicorn

# Ejecutar servidor de producción
gunicorn --bind 0.0.0.0:8000 main:app

# Con workers múltiples
gunicorn --bind 0.0.0.0:8000 --workers 4 main:app
```

### 🛡️ Configuración de Seguridad para Producción

```bash
# Configuración mínima de seguridad
export SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
export JWT_SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
export FLASK_ENV=production
export FLASK_DEBUG=False
```

## 🚀 Guía de Inicio Rápido

### Para comenzar inmediatamente:

1. **Inicia la aplicación:**
```bash
python main.py
```

2. **Registra un usuario:**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "test123"}'
```

3. **Inicia sesión y obtén tu token:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "test123"}'
```

4. **Copia el `access_token` de la respuesta y úsalo en todos los endpoints de libros:**
```bash
curl -X GET http://localhost:5000/app/books \
  -H "Authorization: Bearer <tu_access_token>"
```

¡Ya puedes gestionar libros de forma segura con autenticación JWT! 🎉

### Resumen de Endpoints

| Endpoint | Método | Autenticación | Descripción |
|----------|--------|---------------|-------------|
| `/auth/register` | POST | ❌ No | Registrar usuario |
| `/auth/login` | POST | ❌ No | Iniciar sesión |
| `/auth/profile` | GET | ✅ JWT | Obtener perfil |
| `/auth/users` | GET | ✅ JWT | Listar usuarios |
| `/app/books` | GET | ✅ JWT | Obtener todos los libros |
| `/app/books/<id>` | GET | ✅ JWT | Obtener libro por ID |
| `/app/books` | POST | ✅ JWT | Crear nuevo libro |
| `/app/books/<id>` | PUT | ✅ JWT | Actualizar libro |
| `/app/books/<id>` | DELETE | ✅ JWT | Eliminar libro |


## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Javier M. Plata**
- GitHub: [@JavierMPlata](https://github.com/JavierMPlata)

