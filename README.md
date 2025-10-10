# 📚 API CRUD de Libros con Autenticación JWT - Flask + Next.js

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.21-red.svg)](https://www.sqlalchemy.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-JavierMPlata-black.svg)](https://github.com/JavierMPlata)

Una aplicación full-stack completa con **backend Flask** (API REST) y **frontend Next.js** (UI moderna), implementando gestión de libros con autenticación JWT, operaciones CRUD y arquitectura modular y escalable.

## 🎯 Novedades

### ✨ **Frontend Next.js 14 Añadido**
- 🎨 **Interfaz moderna** con Tailwind CSS y diseño responsivo
- ⚡ **App Router** de Next.js 14 para mejor rendimiento
- 🔐 **Manejo automático de JWT tokens** con interceptores HTTP
- 📱 **Diseño responsive** optimizado para móviles, tablets y desktop
- 🏗️ **Arquitectura limpia** con separación de servicios y tipos TypeScript
- 📝 **TypeScript completo** para type safety en toda la aplicación
- 🔄 **Interceptores HTTP** para manejo automático de autenticación
- 🎯 **Gestión de estados** optimizada para operaciones CRUD
- 📊 **Manejo de errores** centralizado con mensajes user-friendly
- 🚀 **Single Page Application** con navegación fluida

## 🚀 Características

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
- 🔧 **Configuración flexible** para diferentes entornos de desarrollo
- 🚄 **Railway deployment** optimizado para producción
- 📚 **Documentación modular** con README específicos por módulo
- 🌍 **Variables de entorno** con archivo .env para configuración segura
- ⚡ **Servidor de producción** con Gunicorn incluido
- 🔄 **Configuración automática** de base de datos según disponibilidad

## 🔧 Tecnologías

### Backend
- **[Flask](https://flask.palletsprojects.com/)**: Framework web minimalista de Python
- **[Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)**: Manejo de autenticación JWT
- **[Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)**: ORM integrado con Flask
- **[Flask-CORS](https://flask-cors.readthedocs.io/)**: Manejo de CORS para integración con frontend
- **[SQLAlchemy](https://www.sqlalchemy.org/)**: ORM para Python y manejo de base de datos
- **[Bcrypt](https://pypi.org/project/bcrypt/)**: Hashing seguro de contraseñas
- **[PyMySQL](https://pypi.org/project/PyMySQL/)**: Conector MySQL para Python
- **[Python-dotenv](https://pypi.org/project/python-dotenv/)**: Gestión de variables de entorno
- **[Gunicorn](https://gunicorn.org/)**: Servidor WSGI para producción

### Frontend
- **[Next.js 14](https://nextjs.org/)**: Framework React con App Router
- **[React 18](https://react.dev/)**: Librería UI
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript con tipos
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS utilitario
- **[Axios](https://axios-http.com/)**: Cliente HTTP con interceptores
  
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
- [Frontend Next.js](#frontend-nextjs)
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

5. **Ejecuta el backend:**
```bash
python main.py
```

El backend estará disponible en `http://localhost:5000`

6. **Configura y ejecuta el frontend (opcional):**
```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias de Node.js
npm install

# Crear archivo de configuración
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000" > .env.local

# Ejecutar el frontend
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

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
├── frontend/             # Frontend Next.js 14 con TypeScript
│   ├── .env.local       # Variables de entorno del frontend
│   ├── .next/           # Build files de Next.js
│   ├── node_modules/    # Dependencias de Node.js
│   ├── public/          # Archivos estáticos
│   ├── src/             # Código fuente del frontend
│   │   ├── app/         # App Router de Next.js 14
│   │   │   ├── globals.css      # Estilos globales
│   │   │   ├── layout.tsx       # Layout principal
│   │   │   ├── page.tsx         # Página principal
│   │   │   ├── books/           # Gestión de libros
│   │   │   │   └── page.tsx     # CRUD de libros
│   │   │   ├── login/           # Autenticación
│   │   │   │   └── page.tsx     # Página de login
│   │   │   └── register/        # Registro
│   │   │       └── page.tsx     # Página de registro
│   │   ├── lib/         # Utilidades y configuraciones
│   │   │   └── apiClient.ts     # Cliente HTTP con Axios
│   │   ├── services/    # Servicios para interactuar con API
│   │   │   ├── authService.ts   # Servicios de autenticación
│   │   │   └── bookService.ts   # Servicios de libros
│   │   └── types/       # Definiciones de tipos TypeScript
│   │       ├── api.types.ts     # Tipos para API
│   │       ├── book.types.ts    # Tipos de libros
│   │       └── user.types.ts    # Tipos de usuarios
│   ├── next.config.js   # Configuración de Next.js
│   ├── package.json     # Dependencias del frontend
│   ├── tailwind.config.ts # Configuración de Tailwind CSS
│   ├── tsconfig.json    # Configuración de TypeScript
│   └── README_frontned.md # Documentación del frontend
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
| `README_frontned.md` | `/frontend/` | Frontend Next.js, componentes y configuración |

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

## 🎨 Frontend Next.js

### Características del Frontend

La aplicación incluye un frontend completo desarrollado con Next.js 14 que proporciona:

#### 🖥️ **Interfaz de Usuario**
- **Diseño moderno**: Interfaz clean y responsiva con Tailwind CSS
- **App Router**: Utiliza el nuevo sistema de enrutado de Next.js 14
- **TypeScript**: Tipado completo para mayor robustez y autocompletado
- **Responsive Design**: Optimizado para móviles, tablets y desktop

#### 🔐 **Gestión de Autenticación**
- **Login/Register**: Formularios de autenticación con validación
- **JWT Integration**: Manejo automático de tokens con interceptores HTTP
- **Session Management**: Persistencia de sesión con sessionStorage
- **Auto-logout**: Redirección automática cuando el token expira

#### 📚 **Gestión de Libros**
- **Lista de libros**: Vista de todos los libros con información completa
- **Crear libros**: Formulario para añadir nuevos libros
- **Editar libros**: Actualización de información existente
- **Eliminar libros**: Confirmación antes de eliminar registros
- **Validación**: Formularios con validación client-side

#### 🏗️ **Arquitectura Frontend**
- **Servicios**: Capa de abstracción para API calls (`authService`, `bookService`)
- **ApiClient**: Cliente HTTP centralizado con Axios e interceptores
- **Tipos TypeScript**: Definiciones completas para datos (`Book`, `User`, `ApiResponse`)
- **Componentes**: Estructura modular y reutilizable

### Configuración del Frontend

```bash
# Variables de entorno del frontend (.env.local)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Rutas Disponibles

| Ruta | Descripción | Autenticación |
|------|-------------|---------------|
| `/` | Página principal con información del proyecto | ❌ No |
| `/login` | Inicio de sesión | ❌ No |
| `/register` | Registro de nuevos usuarios | ❌ No |
| `/books` | Gestión completa de libros (CRUD) | ✅ Sí |

### Tecnologías Frontend

- **Next.js 14**: Framework React con App Router
- **React 18**: Biblioteca de componentes UI
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitario
- **Axios**: Cliente HTTP con interceptores
- **ESLint**: Linting para mantener calidad de código

### Ejecutar el Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
npm run start
```

**📋 Nota**: El frontend se conecta automáticamente al backend Flask en `http://localhost:5000` y utiliza los mismos endpoints de la API REST.

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

### Opción 1: Solo Backend (API REST)

```bash
python main.py
```

El servidor backend se iniciará en `http://localhost:5000`

**Página de bienvenida**: Visita `http://localhost:5000` para ver la información de la API y endpoints disponibles.

### Opción 2: Aplicación Full-Stack (Recomendado)

#### 1. Iniciar el Backend:
```bash
python main.py
```

#### 2. Iniciar el Frontend:
```bash
cd frontend
npm install
npm run dev
```

- **Backend**: `http://localhost:5000` (API REST)
- **Frontend**: `http://localhost:3000` (Interfaz de usuario)

### Usando la Aplicación Web

1. **Accede al frontend**: `http://localhost:3000`
2. **Regístrate**: Crea una nueva cuenta de usuario
3. **Inicia sesión**: Obtén acceso a la gestión de libros
4. **Gestiona libros**: Realiza operaciones CRUD desde la interfaz web

### Usando la API directamente

Para usar solo la API REST, consulta la sección [Endpoints de la API](#endpoints-de-la-api) y [Ejemplos de Uso](#ejemplos-de-uso).

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

### Dependencias del Backend

```
flask
flask_sqlalchemy
flask_jwt_extended
flask-cors
pymysql
werkzeug
python-dotenv
gunicorn
sqlalchemy
flasgger
PyYAML
```

### Dependencias del Frontend

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.0"
  }
}
```

**Características de las dependencias:**

- **Backend**: Flask moderno con JWT, CORS habilitado para frontend, base de datos dual
- **Frontend**: Next.js 14 con App Router, TypeScript, Tailwind CSS y Axios
- **Integración**: Comunicación seamless entre frontend y backend via API REST

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
# Backend - Configuración mínima de seguridad
export SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
export JWT_SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
export FLASK_ENV=production
export FLASK_DEBUG=False
```

### 🎨 Despliegue del Frontend

#### Vercel (Recomendado para Frontend)
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy desde el directorio frontend
cd frontend
vercel --prod

# 3. Configurar variable de entorno en Vercel
# NEXT_PUBLIC_API_BASE_URL=https://tu-backend-url.com
```

#### Netlify
```bash
# 1. Build del proyecto
cd frontend
npm run build

# 2. Deploy estático
# Subir carpeta .next/out a Netlify
```

#### Railway (Full-Stack)
```bash
# Railway puede deployar tanto backend como frontend
# Configuración automática para monorepo
```

## 🚀 Guía de Inicio Rápido

### Opción 1: Aplicación Web Completa (Recomendado)

1. **Clona e instala el backend:**
```bash
git clone https://github.com/JavierMPlata/CRUD-FLASK.git
cd CRUD-FLASK
pip install -r requirements.txt
python main.py
```

2. **Instala y ejecuta el frontend:**
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000" > .env.local
npm run dev
```

3. **Accede a la aplicación:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

4. **Usa la interfaz web:**
   - Regístrate en `/register`
   - Inicia sesión en `/login`
   - Gestiona libros en `/books`

### Opción 2: Solo API REST

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

4. **Usa el token para gestionar libros:**
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

