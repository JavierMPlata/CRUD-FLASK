"""
Servicio para el modelo User.
Maneja la lógica de negocio relacionada con usuarios, incluyendo
registro, autenticación y hash de contraseñas.
"""

from repositories.user_repository import UserRepository
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)

class UserService:
    """Servicio para manejar la lógica de negocio de usuarios"""

    def __init__(self, db_session: Session):
        self.user_repository = UserRepository(db_session)

    def register_user(self, username: str, password: str):
        """
        Registra un nuevo usuario en el sistema
        
        Args:
            username (str): Nombre de usuario
            password (str): Contraseña en texto plano
            
        Returns:
            User: Usuario creado o dict con error si ya existe
        """
        logger.info(f'Registrando usuario en servicio: {username}')
        
        # Validar si el usuario ya existe
        existing_user = self.user_repository.get_by_username(username)
        if existing_user:
            logger.warning(f'Intento de registro con usuario existente: {username}')
            return {'error': 'Usuario ya existe', 'username': username}
        
        # Hash de la contraseña
        hashed_password = generate_password_hash(password)
        logger.info(f'Contraseña hasheada para usuario: {username}')
        
        # Crear el usuario
        user = self.user_repository.create_user(username, hashed_password)
        logger.info(f'Usuario creado en servicio: {user.username} (ID: {user.id})')
        return user

    def authenticate(self, username: str, password: str):
        """
        Autentica un usuario verificando sus credenciales
        
        Args:
            username (str): Nombre de usuario
            password (str): Contraseña en texto plano
            
        Returns:
            User: Usuario autenticado o None si las credenciales son inválidas
        """
        logger.info(f'Autenticando usuario en servicio: {username}')
        
        user = self.user_repository.get_by_username(username)
        if user and check_password_hash(user.password, password):
            logger.info(f'Autenticación exitosa en servicio: {username}')
            return user
        
        logger.warning(f'Autenticación fallida en servicio: {username}')
        return None

    def get_user_by_id(self, user_id: int):
        """
        Obtiene un usuario por su ID
        
        Args:
            user_id (int): ID del usuario
            
        Returns:
            User: Usuario encontrado o None
        """
        logger.info(f'Obteniendo usuario por ID en servicio: {user_id}')
        return self.user_repository.get_by_id(user_id)

    def get_user_by_username(self, username: str):
        """
        Obtiene un usuario por su nombre de usuario
        
        Args:
            username (str): Nombre de usuario
            
        Returns:
            User: Usuario encontrado o None
        """
        logger.info(f'Obteniendo usuario por nombre en servicio: {username}')
        return self.user_repository.get_by_username(username)

    def get_all_users(self):
        """
        Obtiene todos los usuarios del sistema
        
        Returns:
            List[User]: Lista de todos los usuarios
        """
        logger.info('Obteniendo todos los usuarios en servicio')
        users = self.user_repository.get_all()
        logger.info(f'{len(users)} usuarios obtenidos en servicio')
        return users

    def update_user(self, user_id: int, user_data: dict):
        """
        Actualiza un usuario existente
        
        Args:
            user_id (int): ID del usuario a actualizar
            user_data (dict): Datos a actualizar
            
        Returns:
            User: Usuario actualizado o None si no existe
        """
        logger.info(f'Actualizando usuario en servicio: {user_id}')
        
        # Si se está actualizando la contraseña, hashearla
        if 'password' in user_data:
            user_data['password'] = generate_password_hash(user_data['password'])
            logger.info(f'Contraseña hasheada para actualización de usuario: {user_id}')
        
        return self.user_repository.update_user(user_id, user_data)

    def delete_user(self, user_id: int):
        """
        Elimina un usuario del sistema
        
        Args:
            user_id (int): ID del usuario a eliminar
            
        Returns:
            User: Usuario eliminado o None si no existía
        """
        logger.info(f'Eliminando usuario en servicio: {user_id}')
        return self.user_repository.delete_user(user_id)