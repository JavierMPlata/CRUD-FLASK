# API de Clima - Weatherbit

Este módulo permite consumir la API de Weatherbit a través de RapidAPI para obtener información del clima.

## 📋 Configuración

### 1. Obtener API Key de RapidAPI

1. Ve a [RapidAPI - Weatherbit](https://rapidapi.com/weatherbit/api/weather/)
2. Regístrate o inicia sesión
3. Suscríbete al plan (tienen uno gratuito)
4. Copia tu API Key

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (puedes copiar `.env.example`):

```bash
# .env
RAPIDAPI_KEY=tu_clave_de_rapidapi_aqui
JWT_SECRET_KEY=tu_clave_secreta_jwt
```

### 3. Instalar Dependencias

```bash
pip install -r requirements.txt
```

## 🚀 Endpoints Disponibles

Todos los endpoints requieren autenticación JWT. Incluye el token en el header:
```
Authorization: Bearer <tu_token_jwt>
```

### 1. Clima Actual

**GET** `/weather/current`

Obtiene el clima actual de una ubicación.

**Parámetros:**
- `lat` (float, requerido): Latitud (-90 a 90)
- `lon` (float, requerido): Longitud (-180 a 180)
- `units` (string, opcional): 'metric' (Celsius) o 'imperial' (Fahrenheit) - Default: 'metric'
- `lang` (string, opcional): Idioma ('es', 'en', etc.) - Default: 'es'

**Ejemplo:**
```bash
curl -X GET "http://localhost:5000/weather/current?lat=19.4326&lon=-99.1332&units=metric&lang=es" \
  -H "Authorization: Bearer <tu_token>"
```

### 2. Pronóstico cada 3 Horas

**GET** `/weather/forecast/3hourly`

Obtiene el pronóstico del clima cada 3 horas.

**Parámetros:**
- `lat` (float, requerido): Latitud (-90 a 90)
- `lon` (float, requerido): Longitud (-180 a 180)
- `units` (string, opcional): 'metric' o 'imperial' - Default: 'metric'
- `lang` (string, opcional): Idioma - Default: 'es'

**Ejemplo:**
```bash
curl -X GET "http://localhost:5000/weather/forecast/3hourly?lat=19.4326&lon=-99.1332" \
  -H "Authorization: Bearer <tu_token>"
```

### 3. Pronóstico Diario

**GET** `/weather/forecast/daily`

Obtiene el pronóstico diario del clima.

**Parámetros:**
- `lat` (float, requerido): Latitud (-90 a 90)
- `lon` (float, requerido): Longitud (-180 a 180)
- `days` (int, opcional): Número de días (1-16) - Default: 7
- `units` (string, opcional): 'metric' o 'imperial' - Default: 'metric'
- `lang` (string, opcional): Idioma - Default: 'es'

**Ejemplo:**
```bash
curl -X GET "http://localhost:5000/weather/forecast/daily?lat=19.4326&lon=-99.1332&days=7" \
  -H "Authorization: Bearer <tu_token>"
```

## 🔧 Uso Completo (Workflow)

### Paso 1: Registrar Usuario

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario",
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
```

### Paso 2: Iniciar Sesión

```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario",
    "password": "contraseña123"
  }'
```

**Respuesta:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {...}
}
```

### Paso 3: Consultar Clima

Usa el `access_token` obtenido en el paso anterior:

```bash
curl -X GET "http://localhost:5000/weather/current?lat=19.4326&lon=-99.1332" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

## 📍 Ejemplos de Coordenadas

- **Ciudad de México**: lat=19.4326, lon=-99.1332
- **Nueva York**: lat=40.7128, lon=-74.0060
- **Londres**: lat=51.5074, lon=-0.1278
- **Tokio**: lat=35.6762, lon=139.6503
- **Madrid**: lat=40.4168, lon=-3.7038

## 🔍 Estructura del Proyecto

```
services/
  └── weather_service.py      # Lógica para consumir API de Weatherbit
controllers/
  └── weather_controller.py   # Endpoints REST para clima
```

## 🛠️ Arquitectura

El módulo sigue el patrón de diseño del proyecto:

1. **Service Layer** (`weather_service.py`): Maneja la comunicación con la API externa de Weatherbit
2. **Controller Layer** (`weather_controller.py`): Define los endpoints REST y valida parámetros
3. **Main App** (`main.py`): Registra el blueprint con el prefijo `/weather`

## ⚠️ Manejo de Errores

La API maneja los siguientes errores:

- **400 Bad Request**: Parámetros faltantes o inválidos
- **401 Unauthorized**: Token JWT faltante, inválido o expirado
- **500 Internal Server Error**: Error al consumir la API externa o error del servidor

## 📊 Respuesta Exitosa

```json
{
  "data": [
    {
      "timestamp_local": "2025-11-09T10:00:00",
      "temp": 22.5,
      "weather": {
        "description": "Parcialmente nublado"
      },
      "wind_spd": 3.5,
      "precip": 0
    }
  ],
  "city_name": "Ciudad de México",
  "country_code": "MX"
}
```

## 🔒 Seguridad

- La API Key de RapidAPI se almacena en variables de entorno (nunca en el código)
- Todos los endpoints requieren autenticación JWT
- Se validan los rangos de latitud y longitud
- Se manejan timeouts para evitar bloqueos

## 📝 Notas

- El plan gratuito de RapidAPI tiene límites de requests por día
- Los tokens JWT expiran después de 1 hora
- Se recomienda usar `units=metric` para Celsius
