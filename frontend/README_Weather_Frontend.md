# Frontend - Integración API de Clima

Este documento describe la implementación de la funcionalidad de clima en el frontend de Next.js.

## 📁 Archivos Creados

### 1. Tipos TypeScript
**`src/types/weather.types.ts`**
- Define todas las interfaces para los datos del clima
- `CurrentWeatherResponse`: Respuesta del clima actual
- `ForecastResponse`: Respuesta del pronóstico por horas
- `DailyForecastResponse`: Respuesta del pronóstico diario
- `WeatherQueryParams`: Parámetros para las consultas

### 2. Servicio de Clima
**`src/services/weatherService.ts`**
- `getCurrentWeather()`: Obtiene el clima actual
- `getForecast3Hourly()`: Obtiene pronóstico cada 3 horas
- `getForecastDaily()`: Obtiene pronóstico diario (hasta 7 días)

### 3. Componentes
**`src/components/WeatherCard.tsx`**
- Componente reutilizable para mostrar información del clima
- Muestra temperatura, humedad, viento, precipitación
- Iconos dinámicos según condición climática
- Soporte para vista actual y pronóstico

### 4. Página de Clima
**`src/app/weather/page.tsx`**
- Interfaz completa para ver el clima
- Selector de ciudades predefinidas
- Toggle entre Celsius (°C) y Fahrenheit (°F)
- Vista del clima actual
- Pronóstico de 7 días
- Protección de autenticación (requiere JWT)

## 🎨 Características de la UI

### Diseño Responsivo
- ✅ Diseño adaptable para móvil, tablet y escritorio
- ✅ Grid responsivo para las tarjetas de pronóstico
- ✅ Gradientes y efectos de fondo modernos
- ✅ Animaciones suaves y transiciones

### Ciudades Disponibles
Por defecto incluye 8 ciudades:
- 🇲🇽 Ciudad de México
- 🇲🇽 Guadalajara
- 🇲🇽 Monterrey
- 🇲🇽 Cancún
- 🇺🇸 Nueva York
- 🇬🇧 Londres
- 🇯🇵 Tokio
- 🇪🇸 Madrid

### Información Mostrada

**Clima Actual:**
- Temperatura actual y sensación térmica
- Descripción del clima
- Humedad relativa
- Velocidad y dirección del viento
- Precipitación
- Índice UV
- Hora de amanecer y atardecer

**Pronóstico (7 días):**
- Temperatura máxima y mínima
- Descripción del clima
- Humedad
- Viento
- Probabilidad de lluvia
- Precipitación esperada

## 🔐 Seguridad

- ✅ Autenticación JWT requerida
- ✅ Redirección automática al login si no hay sesión
- ✅ Token incluido en todas las peticiones
- ✅ Manejo de errores de autenticación

## 🚀 Cómo Usar

### 1. Iniciar el Backend
```bash
cd "C:\Users\javim\Documents\U\8\Ingeneria web\CRUD-FLASK"
python main.py
```

### 2. Iniciar el Frontend
```bash
cd frontend
npm run dev
```

### 3. Acceder a la Aplicación
1. Abre `http://localhost:3000`
2. Inicia sesión o regístrate
3. En la página de libros, haz clic en el botón **"🌤️ Clima"**
4. Selecciona una ciudad del dropdown
5. Cambia entre °C y °F según prefieras
6. Haz clic en "🔄 Actualizar" para refrescar los datos

## 🎯 Flujo de Navegación

```
Login/Register → Books → Weather
                  ↑         ↓
                  ←─────────┘
```

- Desde la página de **Books**, botón "🌤️ Clima" te lleva a **Weather**
- Desde la página de **Weather**, botón "← Volver a Libros" te regresa a **Books**

## 🛠️ Personalización

### Agregar Más Ciudades

Edita `frontend/src/app/weather/page.tsx`:

```typescript
const CITIES: CityLocation[] = [
  { name: 'Tu Ciudad', lat: 12.345, lon: -67.890, country: 'XX' },
  // ... más ciudades
];
```

### Cambiar Idioma

Por defecto usa español (`lang: 'es'`). Para cambiar:

```typescript
weatherService.getCurrentWeather({
  lat: lat,
  lon: lon,
  units: 'metric',
  lang: 'en' // Cambiar a inglés u otro idioma
})
```

### Cambiar Unidades por Defecto

En `frontend/src/app/weather/page.tsx`:

```typescript
const [units, setUnits] = useState<'metric' | 'imperial'>('imperial'); // Para Fahrenheit
```

## 🐛 Manejo de Errores

La aplicación maneja varios tipos de errores:

1. **Token Expirado**: Redirección automática al login
2. **API Key Inválida**: Mensaje de error con instrucciones
3. **Sin Conexión**: Mensaje de error de red
4. **Coordenadas Inválidas**: Validación de rangos

## 📊 Rendimiento

- ✅ Carga paralela de clima actual y pronóstico
- ✅ Caché del API client (axios)
- ✅ Loading spinners durante las peticiones
- ✅ Actualización bajo demanda

## 🎨 Iconos del Clima

Los iconos se asignan automáticamente según el código del clima:

- ⛈️ Tormenta (200-299)
- 🌦️ Llovizna (300-399)
- 🌧️ Lluvia (500-599)
- ❄️ Nieve (600-699)
- 🌫️ Niebla (700-799)
- ☀️ Despejado (800)
- ☁️ Nublado (801-899)

## 📝 Notas Técnicas

### Dependencias Usadas
- `axios`: Cliente HTTP
- `next/navigation`: Navegación en Next.js 13+
- `react`: Framework principal
- TypeScript para tipado fuerte

### Estructura del State
```typescript
- selectedCity: CityLocation
- currentWeather: CurrentWeatherData | null
- forecast: DailyForecastData[]
- loading: boolean
- error: string | null
- units: 'metric' | 'imperial'
```

### API Endpoints Consumidos
```
GET /weather/current?lat={lat}&lon={lon}&units={units}&lang={lang}
GET /weather/forecast/3hourly?lat={lat}&lon={lon}&units={units}&lang={lang}
GET /weather/forecast/daily?lat={lat}&lon={lon}&days={days}&units={units}&lang={lang}
```

## ✨ Próximas Mejoras Sugeridas

- [ ] Búsqueda de ciudades personalizada
- [ ] Geolocalización automática del usuario
- [ ] Gráficas de temperatura
- [ ] Historial de búsquedas
- [ ] Notificaciones de alertas climáticas
- [ ] Modo oscuro/claro
- [ ] Compartir pronóstico en redes sociales
- [ ] Widget de clima en la página de libros

## 🆘 Solución de Problemas

### Error: "RAPIDAPI_KEY no configurada"
**Solución**: Agrega tu API Key en el archivo `.env` del backend:
```
RAPIDAPI_KEY=tu_api_key_aqui
```

### Error: "Token expirado"
**Solución**: Cierra sesión y vuelve a iniciar sesión para obtener un nuevo token.

### Error: "Error al cargar datos del clima"
**Solución**: 
1. Verifica que el backend esté corriendo en `http://localhost:5000`
2. Verifica tu conexión a internet
3. Revisa la consola del navegador para más detalles

### La página no carga
**Solución**:
1. Asegúrate de haber iniciado sesión
2. Verifica que `NEXT_PUBLIC_API_BASE_URL` esté configurado
3. Revisa la consola del navegador para errores

---

¡Disfruta consultando el clima desde tu aplicación! 🌤️
