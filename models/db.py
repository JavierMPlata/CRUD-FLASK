"""
Configuración de SQLAlchemy para la aplicación.
Archivo que maneja la instancia de SQLAlchemy utilizada por los modelos.
"""

from flask_sqlalchemy import SQLAlchemy

# Instancia de SQLAlchemy que será inicializada por la aplicación Flask
db = SQLAlchemy()