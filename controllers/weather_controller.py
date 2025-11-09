"""
Controlador para los endpoints relacionados con el clima
"""
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from services.weather_service import WeatherService
import logging

logger = logging.getLogger(__name__)

# Crear blueprint para el clima
weather_bp = Blueprint('weather', __name__)

# Inicializar servicio
weather_service = WeatherService()


@weather_bp.route('/forecast/3hourly', methods=['GET'])
@jwt_required()
def get_forecast_3hourly():
    """
    Obtener pronóstico del clima cada 3 horas
    
    Query Parameters:
        - lat (float): Latitud (requerido)
        - lon (float): Longitud (requerido)
        - units (str): 'metric' (Celsius) o 'imperial' (Fahrenheit) - default: 'metric'
        - lang (str): Idioma ('es', 'en', etc.) - default: 'es'
    
    Returns:
        JSON con el pronóstico del clima
    """
    try:
        # Obtener parámetros
        lat = request.args.get('lat', type=float)
        lon = request.args.get('lon', type=float)
        units = request.args.get('units', 'metric')
        lang = request.args.get('lang', 'es')
        
        # Validar parámetros requeridos
        if lat is None or lon is None:
            return jsonify({
                'error': 'Parámetros faltantes',
                'message': 'Se requieren los parámetros lat (latitud) y lon (longitud)'
            }), 400
        
        # Validar rangos
        if not (-90 <= lat <= 90):
            return jsonify({
                'error': 'Latitud inválida',
                'message': 'La latitud debe estar entre -90 y 90'
            }), 400
        
        if not (-180 <= lon <= 180):
            return jsonify({
                'error': 'Longitud inválida',
                'message': 'La longitud debe estar entre -180 y 180'
            }), 400
        
        # Obtener pronóstico
        result = weather_service.get_forecast_3hourly(lat, lon, units, lang)
        
        if result['success']:
            return jsonify(result['data']), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error en get_forecast_3hourly: {str(e)}")
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500


@weather_bp.route('/current', methods=['GET'])
@jwt_required()
def get_current_weather():
    """
    Obtener clima actual
    
    Query Parameters:
        - lat (float): Latitud (requerido)
        - lon (float): Longitud (requerido)
        - units (str): 'metric' (Celsius) o 'imperial' (Fahrenheit) - default: 'metric'
        - lang (str): Idioma ('es', 'en', etc.) - default: 'es'
    
    Returns:
        JSON con el clima actual
    """
    try:
        # Obtener parámetros
        lat = request.args.get('lat', type=float)
        lon = request.args.get('lon', type=float)
        units = request.args.get('units', 'metric')
        lang = request.args.get('lang', 'es')
        
        # Validar parámetros requeridos
        if lat is None or lon is None:
            return jsonify({
                'error': 'Parámetros faltantes',
                'message': 'Se requieren los parámetros lat (latitud) y lon (longitud)'
            }), 400
        
        # Validar rangos
        if not (-90 <= lat <= 90):
            return jsonify({
                'error': 'Latitud inválida',
                'message': 'La latitud debe estar entre -90 y 90'
            }), 400
        
        if not (-180 <= lon <= 180):
            return jsonify({
                'error': 'Longitud inválida',
                'message': 'La longitud debe estar entre -180 y 180'
            }), 400
        
        # Obtener clima actual
        result = weather_service.get_current_weather(lat, lon, units, lang)
        
        if result['success']:
            return jsonify(result['data']), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error en get_current_weather: {str(e)}")
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500


@weather_bp.route('/forecast/daily', methods=['GET'])
@jwt_required()
def get_forecast_daily():
    """
    Obtener pronóstico diario
    
    Query Parameters:
        - lat (float): Latitud (requerido)
        - lon (float): Longitud (requerido)
        - days (int): Número de días (1-16) - default: 7
        - units (str): 'metric' (Celsius) o 'imperial' (Fahrenheit) - default: 'metric'
        - lang (str): Idioma ('es', 'en', etc.) - default: 'es'
    
    Returns:
        JSON con el pronóstico diario
    """
    try:
        # Obtener parámetros
        lat = request.args.get('lat', type=float)
        lon = request.args.get('lon', type=float)
        days = request.args.get('days', 7, type=int)
        units = request.args.get('units', 'metric')
        lang = request.args.get('lang', 'es')
        
        # Validar parámetros requeridos
        if lat is None or lon is None:
            return jsonify({
                'error': 'Parámetros faltantes',
                'message': 'Se requieren los parámetros lat (latitud) y lon (longitud)'
            }), 400
        
        # Validar rangos
        if not (-90 <= lat <= 90):
            return jsonify({
                'error': 'Latitud inválida',
                'message': 'La latitud debe estar entre -90 y 90'
            }), 400
        
        if not (-180 <= lon <= 180):
            return jsonify({
                'error': 'Longitud inválida',
                'message': 'La longitud debe estar entre -180 y 180'
            }), 400
        
        # Obtener pronóstico diario
        result = weather_service.get_forecast_daily(lat, lon, days, units, lang)
        
        if result['success']:
            return jsonify(result['data']), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error en get_forecast_daily: {str(e)}")
        return jsonify({'error': f'Error interno del servidor: {str(e)}'}), 500
