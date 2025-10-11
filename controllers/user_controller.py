"""
Controlador para el modelo User.
Define los endpoints REST para registro, login y gestión de usuarios.
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from services.user_service import UserService
from config.database import get_db_session
from models.user_model import User
import logging

logger = logging.getLogger(__name__)

# Crear Blueprint para las rutas de usuarios
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    """
    Endpoint para registrar un nuevo usuario
    
    Expected JSON:
    {
        "username": "usuario123",
        "email": "usuario@example.com",
        "password": "contraseña123"
    }
    
    Returns:
        201: Usuario creado exitosamente
        400: Datos inválidos
        409: Usuario o email ya existe
        500: Error interno
    """
    try:
        data = request.get_json() or {}
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        # Validar datos de entrada
        if not username or not email or not password:
            return jsonify({"error": "Username, email y password son requeridos"}), 400
        
        # Validar formato de datos
        validation_error = User.validate_user_data(data)
        if validation_error:
            return jsonify({"error": validation_error}), 400
        
        logger.info(f'Registrando usuario: {username}')
        
        # Crear servicio con nueva sesión
        service = UserService(get_db_session())
        user = service.register_user(username, email, password)
        
        # Verificar si el usuario o email ya existe
        if isinstance(user, dict) and 'error' in user:
            logger.warning(f'Error en registro: {user["error"]}')
            return jsonify({'error': user['error']}), 409
        
        logger.info(f'Usuario registrado exitosamente: {user.username} (ID: {user.id})')
        return jsonify({
            'message': 'Usuario registrado exitosamente',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        logger.exception("Error en registro de usuario")
        return jsonify({
            'error': 'No se pudo completar el registro', 
            'detail': str(e)
        }), 500

@user_bp.route('/login', methods=['POST'])
def login():
    """
    Endpoint para autenticar usuario y obtener token JWT
    
    Expected JSON:
    {
        "login": "usuario123 o email@example.com",
        "password": "contraseña123"
    }
    
    Returns:
        200: Login exitoso con JWT token
        400: Datos inválidos
        401: Credenciales incorrectas
        500: Error interno
    """
    try:
        data = request.get_json() or {}
        login_identifier = data.get('login')
        password = data.get('password')
        
        # Validar datos de entrada
        if not login_identifier or not password:
            return jsonify({"error": "Login y password son requeridos"}), 400
        
        logger.info(f'Intento de login para: {login_identifier}')
        
        # Crear servicio con nueva sesión
        service = UserService(get_db_session())
        user = service.authenticate(login_identifier, password)
        
        if user:
            # Crear token JWT con el ID del usuario
            access_token = create_access_token(identity=str(user.id))
            logger.info(f'Login exitoso para: {login_identifier}')
            
            return jsonify({
                'message': 'Login exitoso',
                'access_token': access_token,
                'user': user.to_dict()
            }), 200
        else:
            logger.warning(f'Login fallido para: {login_identifier}')
            return jsonify({'error': 'Credenciales inválidas'}), 401
            
    except Exception as e:
        logger.exception("Error en login de usuario")
        return jsonify({
            'error': 'No se pudo completar el login', 
            'detail': str(e)
        }), 500

@user_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    """
    Endpoint para obtener lista de usuarios (requiere autenticación JWT)
    
    Headers:
        Authorization: Bearer <jwt_token>
    
    Returns:
        200: Lista de usuarios
        401: Token inválido o faltante
        500: Error interno
    """
    try:
        # Obtener ID del usuario desde el token JWT
        current_user_id = get_jwt_identity()
        logger.info(f'Consultando listado de usuarios (solicitado por usuario ID: {current_user_id})')
        
        # Crear servicio con nueva sesión
        service = UserService(get_db_session())
        users = service.get_all_users()
        
        logger.info(f'{len(users)} usuarios encontrados')
        return jsonify({
            'users': [user.to_dict() for user in users],
            'total': len(users)
        }), 200
        
    except Exception as e:
        logger.error(f'Error al consultar usuarios: {str(e)}')
        return jsonify({
            'error': 'Error al obtener usuarios', 
            'detail': str(e)
        }), 500

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """
    Endpoint para obtener perfil del usuario autenticado
    
    Headers:
        Authorization: Bearer <jwt_token>
    
    Returns:
        200: Datos del usuario
        401: Token inválido
        404: Usuario no encontrado
        500: Error interno
    """
    try:
        # Obtener ID del usuario desde el token JWT
        current_user_id = get_jwt_identity()
        logger.info(f'Consultando perfil de usuario ID: {current_user_id}')
        
        # Crear servicio con nueva sesión
        service = UserService(get_db_session())
        user = service.get_user_by_id(int(current_user_id))
        
        if user:
            logger.info(f'Perfil obtenido para usuario: {user.username}')
            return jsonify({
                'message': 'Perfil obtenido exitosamente',
                'user': user.to_dict()
            }), 200
        else:
            logger.warning(f'Usuario no encontrado con ID: {current_user_id}')
            return jsonify({'error': 'Usuario no encontrado'}), 404
            
    except Exception as e:
        logger.error(f'Error al obtener perfil: {str(e)}')
        return jsonify({
            'error': 'Error al obtener perfil', 
            'detail': str(e)
        }), 500