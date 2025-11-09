"""
Servicio para consumir la API de Weatherbit a través de RapidAPI
"""
import requests
import os
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)


class WeatherService:
    """Servicio para obtener pronósticos del clima usando Weatherbit API"""
    
    BASE_URL = "https://weatherbit-v1-mashape.p.rapidapi.com"
    
    def __init__(self):
        self.api_key = os.getenv('RAPIDAPI_KEY')
        if not self.api_key:
            logger.warning("RAPIDAPI_KEY no está configurada en las variables de entorno")
        
        self.headers = {
            'x-rapidapi-key': self.api_key or '',
            'x-rapidapi-host': "weatherbit-v1-mashape.p.rapidapi.com"
        }
    
    def get_forecast_3hourly(
        self, 
        lat: float, 
        lon: float, 
        units: str = "metric", 
        lang: str = "es"
    ) -> Dict[str, Any]:
        """
        Obtener pronóstico del clima cada 3 horas
        
        Args:
            lat: Latitud de la ubicación
            lon: Longitud de la ubicación
            units: Sistema de unidades ('metric' para Celsius, 'imperial' para Fahrenheit)
            lang: Idioma de respuesta ('es', 'en', etc.)
            
        Returns:
            Dict con los datos del pronóstico
        """
        try:
            url = f"{self.BASE_URL}/forecast/3hourly"
            params = {
                'lat': lat,
                'lon': lon,
                'units': units,
                'lang': lang
            }
            
            logger.info(f"Consultando pronóstico para lat={lat}, lon={lon}")
            
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            logger.info("Pronóstico obtenido exitosamente")
            return {
                'success': True,
                'data': data
            }
            
        except requests.exceptions.Timeout:
            logger.error("Timeout al consultar la API de Weatherbit")
            return {
                'success': False,
                'error': 'Timeout al consultar el servicio del clima'
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"Error al consultar API: {str(e)}")
            return {
                'success': False,
                'error': f'Error al consultar el servicio del clima: {str(e)}'
            }
        except Exception as e:
            logger.error(f"Error inesperado: {str(e)}")
            return {
                'success': False,
                'error': f'Error inesperado: {str(e)}'
            }
    
    def get_current_weather(
        self, 
        lat: float, 
        lon: float, 
        units: str = "metric", 
        lang: str = "es"
    ) -> Dict[str, Any]:
        """
        Obtener clima actual
        
        Args:
            lat: Latitud de la ubicación
            lon: Longitud de la ubicación
            units: Sistema de unidades ('metric' para Celsius, 'imperial' para Fahrenheit)
            lang: Idioma de respuesta ('es', 'en', etc.)
            
        Returns:
            Dict con los datos del clima actual
        """
        try:
            url = f"{self.BASE_URL}/current"
            params = {
                'lat': lat,
                'lon': lon,
                'units': units,
                'lang': lang
            }
            
            logger.info(f"Consultando clima actual para lat={lat}, lon={lon}")
            
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            logger.info("Clima actual obtenido exitosamente")
            return {
                'success': True,
                'data': data
            }
            
        except requests.exceptions.Timeout:
            logger.error("Timeout al consultar la API de Weatherbit")
            return {
                'success': False,
                'error': 'Timeout al consultar el servicio del clima'
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"Error al consultar API: {str(e)}")
            return {
                'success': False,
                'error': f'Error al consultar el servicio del clima: {str(e)}'
            }
        except Exception as e:
            logger.error(f"Error inesperado: {str(e)}")
            return {
                'success': False,
                'error': f'Error inesperado: {str(e)}'
            }
    
    def get_forecast_daily(
        self, 
        lat: float, 
        lon: float, 
        days: int = 7,
        units: str = "metric", 
        lang: str = "es"
    ) -> Dict[str, Any]:
        """
        Obtener pronóstico diario
        
        Args:
            lat: Latitud de la ubicación
            lon: Longitud de la ubicación
            days: Número de días (1-16)
            units: Sistema de unidades ('metric' para Celsius, 'imperial' para Fahrenheit)
            lang: Idioma de respuesta ('es', 'en', etc.)
            
        Returns:
            Dict con los datos del pronóstico diario
        """
        try:
            url = f"{self.BASE_URL}/forecast/daily"
            params = {
                'lat': lat,
                'lon': lon,
                'days': min(max(days, 1), 16),  # Limitar entre 1 y 16
                'units': units,
                'lang': lang
            }
            
            logger.info(f"Consultando pronóstico diario para lat={lat}, lon={lon}, días={days}")
            
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            logger.info("Pronóstico diario obtenido exitosamente")
            return {
                'success': True,
                'data': data
            }
            
        except requests.exceptions.Timeout:
            logger.error("Timeout al consultar la API de Weatherbit")
            return {
                'success': False,
                'error': 'Timeout al consultar el servicio del clima'
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"Error al consultar API: {str(e)}")
            return {
                'success': False,
                'error': f'Error al consultar el servicio del clima: {str(e)}'
            }
        except Exception as e:
            logger.error(f"Error inesperado: {str(e)}")
            return {
                'success': False,
                'error': f'Error inesperado: {str(e)}'
            }
