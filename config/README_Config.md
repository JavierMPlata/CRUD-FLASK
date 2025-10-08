# Configuración de Base de Datos

Este módulo (`database.py`) maneja la configuración y conexión a la base de datos para la aplicación CRUD de libros y usuarios.

## Características Principales

### 1. Soporte Multi-Base de Datos
La aplicación soporta dos tipos de bases de datos:
- **MySQL**: Base de datos principal (preferida)
- **SQLite**: Base de datos de respaldo (fallback)

### 2. Configuración por Variables de Entorno
- Utiliza el archivo `.env` para cargar la configuración de MySQL
- Variable requerida: `MYSQL_URI` (ejemplo: `mysql+pymysql://usuario:contraseña@localhost/nombre_bd`)

### 3. Funcionalidad de Fallback Automático
Si la conexión a MySQL falla, la aplicación automáticamente cambia a SQLite sin interrumpir el servicio.

### 4. Configuración Optimizada de Logging
- Configuración específica para mostrar solo peticiones HTTP importantes
- Silenciamiento de logs verbosos de SQLAlchemy para mejorar la legibilidad
- Logs de Werkzeug habilitados para monitorear peticiones HTTP

## Componentes del Módulo

### Importaciones
```python
import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv
```

### Configuración de Logging Avanzada
- Nivel configurado en `INFO` con formato personalizado
- Silenciamiento específico de logs de SQLAlchemy (engine, pool, dialects)
- Habilitación explícita de logs de Werkzeug para peticiones HTTP
- Formato: `%(levelname)s:%(name)s:%(message)s`

### Variables de Configuración
- `MYSQL_URI`: URI de conexión a MySQL obtenida de variables de entorno
- `SQLITE_URI`: URI actualizada para SQLite (`sqlite:///books_users.db`) - incluye soporte para usuarios

### Función `get_engine()`
Esta función implementa la lógica de conexión con fallback optimizada:

1. **Intento de conexión MySQL**:
   - Verifica si `MYSQL_URI` está configurada
   - Crea el engine sin modo verbose (echo=False)
   - Prueba la conexión y la cierra inmediatamente
   - Si es exitosa, registra el éxito y devuelve el engine

2. **Fallback a SQLite**:
   - Si MySQL falla o no está configurado
   - Registra un warning y cambia a SQLite
   - Crea y devuelve el engine de SQLite sin modo verbose

### Inicialización Global
```python
engine = get_engine()
Session = sessionmaker(bind=engine)
```

- Crea el engine de base de datos con configuración optimizada
- Configura el sessionmaker para crear sesiones
- **Nota**: No se inicializan automáticamente las tablas desde aquí (se maneja mediante Flask-SQLAlchemy)

### Función `get_db_session()`
- Proporciona una nueva sesión de base de datos
- Utilizada por los repositorios para realizar operaciones CRUD
- Nombre actualizado para consistencia en todo el proyecto

## Ventajas del Diseño

1. **Flexibilidad**: Funciona con MySQL en producción y SQLite en desarrollo
2. **Robustez**: Fallback automático asegura disponibilidad
3. **Configurabilidad**: Fácil cambio de base de datos mediante variables de entorno
4. **Logging Optimizado**: Monitoreo claro sin ruido innecesario de SQLAlchemy
5. **Rendimiento**: Configuración sin modo verbose para mejor performance en producción
6. **Separación de responsabilidades**: Configuración centralizada
7. **Soporte Multi-Entidad**: Compatible con libros, usuarios y futuras entidades

## Uso en la Aplicación

Los repositorios importan `get_db_session` para realizar operaciones de base de datos:

```python
from config.database import get_db_session

def some_repository_method():
    session = get_db_session()
    try:
        # Operaciones de base de datos
        pass
    finally:
        session.close()
```

## Configuración Requerida

Para usar MySQL, crear un archivo `.env` en la raíz del proyecto:

```env
MYSQL_URI=mysql+pymysql://usuario:contraseña@localhost/crud_flask_db
```

Si no se configura, la aplicación usará SQLite automáticamente con el archivo `books_users.db`.

## Estructura de Archivos de la Carpeta Config

```
config/
├── __init__.py           # Marca el directorio como paquete Python
├── database.py           # Configuración principal de base de datos
└── README_Config.md      # Esta documentación
```

## Consideraciones de Desarrollo

- **Desarrollo Local**: SQLite se crea automáticamente sin configuración adicional
- **Producción**: Configurar MySQL mediante variables de entorno
- **Testing**: SQLite proporciona un entorno aislado para pruebas
- **Logging**: Los logs están optimizados para mostrar información relevante sin spam