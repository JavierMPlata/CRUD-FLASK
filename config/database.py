import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from models.book_model import Base
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO)

load_dotenv()

MYSQL_URI = os.getenv("MYSQL_URI")  
SQLITE_URI = "sqlite:///books.db"

def get_engine():
    if MYSQL_URI:
        try:
            engine = create_engine(MYSQL_URI, echo=True)
            # Test connection
            conn = engine.connect()
            conn.close()
            logging.info("Connected to MySQL database.")
            return engine
        except OperationalError:
            logging.warning("MySQL connection failed, falling back to SQLite.")
        
    engine = create_engine(SQLITE_URI, echo=True)
    return engine

engine = get_engine()
Session = sessionmaker(bind=engine)
Base.metadata.create_all(engine)

def get_db_session():  # Changed from get_session to match your import
    return Session()