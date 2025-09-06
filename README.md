# 📚 API CRUD de Libros - Flask

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.21-red.svg)](https://www.sqlalchemy.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-JavierMPlata-black.svg)](https://github.com/JavierMPlata)

Una API REST completa desarrollada con Flask para gestionar libros, implementando operaciones CRUD (Create, Read, Update, Delete) con una arquitectura modular y escalable.

## 🚀 Características

- ✅ **API REST completa** con operaciones CRUD
- 📖 **Gestión de libros** (título, autor, fecha de publicación)
- 🏗️ **Arquitectura modular** con separación de responsabilidades (MVC + Service/Repository)
- �️ **Integración con SQLAlchemy** para manejo de base de datos
- 📝 **Validación de datos** robusta con modelos tipados
- 🎯 **Respuestas JSON** consistentes y estructuradas
- 📊 **Manejo de errores** centralizado
- 🔧 **Configuración flexible** para diferentes entornos de desarrollo

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Manejo de Errores](#manejo-de-errores)
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
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Instala las dependencias:**
```bash
pip install -r requirements.txt
```

4. **Ejecuta la aplicación:**
```bash
python main.py
```

La aplicación estará disponible en `http://localhost:5000`

## 📁 Estructura del Proyecto

```
CRUD-FLASK/
├── config/                   # Configuraciones de la aplicación
│   ├── __init__.py          # Inicialización del módulo
│   ├── database.py          # Configuración de base de datos
│   └── __pycache__/         # Archivos compilados de Python
├── controllers/             # Controladores - manejo de rutas HTTP
│   ├── __init__.py         # Inicialización del módulo
│   ├── book_controller.py  # Controlador de libros
│   └── __pycache__/        # Archivos compilados de Python
├── models/                 # Modelos de datos con SQLAlchemy
│   ├── __init__.py        # Inicialización del módulo
│   ├── book_model.py      # Modelo Book con definición de tabla
│   └── __pycache__/       # Archivos compilados de Python
├── repositories/          # Capa de acceso a datos
│   ├── __init__.py       # Inicialización del módulo
│   ├── book_repository.py # Repositorio de libros (CRUD operations)
│   └── __pycache__/      # Archivos compilados de Python
├── services/             # Lógica de negocio
│   ├── __init__.py      # Inicialización del módulo
│   ├── book_service.py  # Servicios de negocio para libros
│   └── __pycache__/     # Archivos compilados de Python
├── main.py              # Punto de entrada principal de la aplicación
├── requirements.txt     # Dependencias del proyecto
├── README.md           # Documentación del proyecto
└── LICENSE            # Licencia del proyecto
```

### Arquitectura

El proyecto sigue una **arquitectura en capas** con separación clara de responsabilidades:

- **Models**: Definen la estructura de datos y mapeo con SQLAlchemy
- **Controllers**: Manejan las peticiones HTTP y respuestas (capa de presentación)
- **Services**: Contienen la lógica de negocio y validaciones
- **Repositories**: Capa de acceso a datos y operaciones de base de datos
- **Config**: Configuraciones para base de datos y diferentes entornos

## ⚙️ Configuración

### Configuraciones disponibles

- **Development**: Para desarrollo local (modo debug activado)
- **Production**: Para producción (optimizado y seguro)
- **Testing**: Para pruebas unitarias

### Variables de entorno

Puedes configurar las siguientes variables de entorno:

```bash
FLASK_ENV=development          # Entorno de ejecución
FLASK_DEBUG=True              # Modo debug
SECRET_KEY=your-secret-key    # Clave secreta para Flask
CORS_ENABLED=True             # Habilitar CORS
```

## 🎯 Uso

### Iniciar la aplicación

```bash
python main.py
```

El servidor se iniciará en `http://localhost:5000`

### Página de bienvenida

Visita `http://localhost:5000` para ver la información de la API y endpoints disponibles.

## 🔌 Endpoints de la API

### Base URL: `http://localhost:5000/app`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/books` | Obtener todos los libros |
| `GET` | `/books/<id>` | Obtener un libro por ID |
| `POST` | `/books` | Crear un nuevo libro |
| `PUT` | `/books/<id>` | Actualizar un libro existente |
| `DELETE` | `/books/<id>` | Eliminar un libro |

### Estructura del objeto Book

```json
{
  "id": 1,
  "title": "Título del libro",
  "author": "Nombre del autor",
  "published_date": "2023-01-01T00:00:00"
}
```

## 💡 Ejemplos de Uso

### 1. Obtener todos los libros

```bash
curl -X GET http://localhost:5000/app/books
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "published_date": "1949-06-08T00:00:00"
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "published_date": "1960-07-11T00:00:00"
  }
]
```

### 2. Obtener un libro específico

```bash
curl -X GET http://localhost:5000/app/books/1
```

**Respuesta:**
```json
{
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
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error interno del servidor

### Ejemplo de respuesta de error

```json
{
  "error": "Book not found"
}
```

### Validaciones

- **Título**: Requerido, no puede estar vacío
- **Autor**: Requerido, no puede estar vacío
- **Fecha de publicación**: Opcional, debe ser una fecha válida

## 🔧 Tecnologías

- **[Flask](https://flask.palletsprojects.com/)**: Framework web minimalista de Python
- **[SQLAlchemy](https://www.sqlalchemy.org/)**: ORM para Python y manejo de base de datos
- **[PyMySQL](https://pypi.org/project/PyMySQL/)**: Conector MySQL para Python
- **Python 3.8+**: Lenguaje de programación
- **JSON**: Formato de intercambio de datos
- **RESTful API**: Arquitectura de servicios web

### Dependencias principales

```
Flask==2.3.3
python-dotenv==1.0.0
SQLAlchemy==2.0.21
PyMySQL==1.1.0
```

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

### Requisitos para producción

- Python 3.8+
- Base de datos MySQL (recomendado para producción)
- Servidor web (Gunicorn, uWSGI)

### Configuración para producción

```bash
# Variables de entorno recomendadas
export FLASK_ENV=production
export FLASK_DEBUG=False
export SECRET_KEY=your-super-secret-production-key
```


## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Javier M. Plata**
- GitHub: [@JavierMPlata](https://github.com/JavierMPlata)

