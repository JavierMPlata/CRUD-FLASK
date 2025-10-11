"""
Repositorio para el modelo User.
Maneja las operaciones de acceso a datos para usuarios.
"""

from models.user_model import User
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)

class UserRepository:
    """Repositorio para manejar las operaciones CRUD de usuarios"""
    
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def get_by_username(self, username: str):
        """Busca un usuario por su nombre de usuario"""
        logger.info(f'Buscando usuario en repositorio: {username}')
        user = self.db_session.query(User).filter_by(username=username).first()
        if user:
            logger.info(f'Usuario encontrado en repositorio: {username}')
        else:
            logger.warning(f'Usuario no encontrado en repositorio: {username}')
        return user

    def get_by_email(self, email: str):
        """Busca un usuario por su email"""
        logger.info(f'Buscando usuario por email en repositorio: {email}')
        user = self.db_session.query(User).filter_by(email=email).first()
        if user:
            logger.info(f'Usuario encontrado por email en repositorio: {email}')
        else:
            logger.warning(f'Usuario no encontrado por email en repositorio: {email}')
        return user

    def get_by_id(self, user_id: int):
        """Busca un usuario por su ID"""
        logger.info(f'Buscando usuario por ID en repositorio: {user_id}')
        user = self.db_session.query(User).filter_by(id=user_id).first()
        if user:
            logger.info(f'Usuario encontrado en repositorio: {user.username}')
        else:
            logger.warning(f'Usuario con ID {user_id} no encontrado en repositorio')
        return user

    def create_user(self, username: str, email: str, password: str):
        """Crea un nuevo usuario"""
        logger.info(f'Creando usuario en repositorio: {username}')
        user = User(username=username, email=email, password=password)
        self.db_session.add(user)
        self.db_session.commit()
        self.db_session.refresh(user)
        logger.info(f'Usuario creado en repositorio: {username} (ID: {user.id})')
        return user

    def get_all(self):
        """Obtiene todos los usuarios"""
        logger.info('Obteniendo todos los usuarios en repositorio')
        users = self.db_session.query(User).all()
        logger.info(f'{len(users)} usuarios obtenidos en repositorio')
        return users

    def update_user(self, user_id: int, user_data: dict):
        """Actualiza un usuario existente"""
        user = self.get_by_id(user_id)
        if user:
            logger.info(f'Actualizando usuario en repositorio: {user.username}')
            for key, value in user_data.items():
                if hasattr(user, key):
                    setattr(user, key, value)
            self.db_session.commit()
            self.db_session.refresh(user)
            logger.info(f'Usuario actualizado en repositorio: {user.username}')
        return user

    def delete_user(self, user_id: int):
        """Elimina un usuario"""
        user = self.get_by_id(user_id)
        if user:
            logger.info(f'Eliminando usuario en repositorio: {user.username}')
            self.db_session.delete(user)
            self.db_session.commit()
            logger.info(f'Usuario eliminado en repositorio: {user.username}')
        return user