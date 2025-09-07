# Configuración de Base de Datos

Este módulo (`database.py`) maneja la configuración y conexión a la base de datos para la aplicación CRUD de libros.

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

## Componentes del Módulo

### Importaciones
```python
import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from models.book_model import Base
from dotenv import load_dotenv
```

### Configuración de Logging
- Nivel configurado en `INFO` para mostrar mensajes informativos
- Registra conexiones exitosas y fallos de conexión

### Variables de Configuración
- `MYSQL_URI`: URI de conexión a MySQL obtenida de variables de entorno
- `SQLITE_URI`: URI fija para SQLite (`sqlite:///books.db`)

### Función `get_engine()`
Esta función implementa la lógica de conexión con fallback:

1. **Intento de conexión MySQL**:
   - Verifica si `MYSQL_URI` está configurada
   - Crea el engine y prueba la conexión
   - Si es exitosa, registra el éxito y devuelve el engine

2. **Fallback a SQLite**:
   - Si MySQL falla o no está configurado
   - Registra un warning y cambia a SQLite
   - Crea y devuelve el engine de SQLite

### Inicialización Global
```python
engine = get_engine()
Session = sessionmaker(bind=engine)
Base.metadata.create_all(engine)
```

- Crea el engine de base de datos
- Configura el sessionmaker para crear sesiones
- Crea todas las tablas definidas en los modelos

### Función `get_db_session()`
- Proporciona una nueva sesión de base de datos
- Utilizada por los repositorios para realizar operaciones CRUD

## Ventajas del Diseño

1. **Flexibilidad**: Funciona con MySQL en producción y SQLite en desarrollo
2. **Robustez**: Fallback automático asegura disponibilidad
3. **Configurabilidad**: Fácil cambio de base de datos mediante variables de entorno
4. **Logging**: Monitoreo claro del estado de conexión
5. **Separación de responsabilidades**: Configuración centralizada

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

Si no se configura, la aplicación usará SQLite automáticamente.