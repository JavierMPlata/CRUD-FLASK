"""
Modelo de usuario para SQLAlchemy.
Define la estructura de la tabla users en la base de datos.
"""

from models.db import db
import logging

logger = logging.getLogger(__name__)

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, username: str, email: str, password: str):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        logger.info(f'Representación de usuario solicitada: {self.username}')
        return f'<User {self.username}>'

    def to_dict(self):
        """Convierte el usuario a diccionario para respuestas JSON"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
            # Note: No incluimos password por seguridad
        }

    @staticmethod
    def validate_user_data(data):
        """Valida los datos de usuario antes de crear/actualizar"""
        if not data.get('username'):
            return "Username es requerido"
        
        if not data.get('email'):
            return "Email es requerido"
        
        if not data.get('password'):
            return "Password es requerido"
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        # Validaciones básicas
        if len(username) < 3:
            return "Username debe tener al menos 3 caracteres"
        
        if len(username) > 80:
            return "Username no puede exceder 80 caracteres"
        
        # Validación básica de email
        if '@' not in email or '.' not in email.split('@')[-1]:
            return "Email debe tener un formato válido"
        
        if len(email) > 120:
            return "Email no puede exceder 120 caracteres"
        
        if len(password) < 6:
            return "Password debe tener al menos 6 caracteres"
        
        return None