import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv

# Configurar logging para mostrar solo peticiones HTTP
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s:%(name)s:%(message)s'
)

# Silenciar logs de SQLAlchemy
logging.getLogger('sqlalchemy.engine').setLevel(logging.WARNING)
logging.getLogger('sqlalchemy.pool').setLevel(logging.WARNING)
logging.getLogger('sqlalchemy.dialects').setLevel(logging.WARNING)

# Asegurar que werkzeug muestre las peticiones HTTP
logging.getLogger('werkzeug').setLevel(logging.INFO)

load_dotenv()

MYSQL_URI = os.getenv("MYSQL_URI")  
SQLITE_URI = "sqlite:///books_users.db"  # Actualizado para incluir usuarios

def get_engine():
    if MYSQL_URI:
        try:
            engine = create_engine(MYSQL_URI)  # Removed echo=True
            # Test connection
            conn = engine.connect()
            conn.close()
            logging.info("Connected to MySQL database.")
            return engine
        except OperationalError as e:
            logging.warning(f"MySQL connection failed: {e}, falling back to SQLite.")
        except Exception as e:
            logging.warning(f"Unexpected error with MySQL: {e}, falling back to SQLite.")
        
    try:
        engine = create_engine(SQLITE_URI)  # Removed echo=True
        logging.info("Connected to SQLite database.")
        return engine
    except Exception as e:
        logging.error(f"Failed to create SQLite engine: {e}")
        raise

engine = get_engine()
Session = sessionmaker(bind=engine)

def get_db_session():  # Changed from get_session to match your import
    return Session()