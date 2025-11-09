'use client';

/**
 * Página de Clima - Muestra el clima actual y pronóstico
 */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { weatherService } from '@/services/weatherService';
import WeatherCard from '@/components/WeatherCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type {
  CurrentWeatherData,
  DailyForecastData,
  CityLocation,
} from '@/types/weather.types';

// Ciudades predefinidas
const CITIES: CityLocation[] = [
  { name: 'Ciudad de México', lat: 19.4326, lon: -99.1332, country: 'MX' },
  { name: 'Guadalajara', lat: 20.6597, lon: -103.3496, country: 'MX' },
  { name: 'Monterrey', lat: 25.6866, lon: -100.3161, country: 'MX' },
  { name: 'Cancún', lat: 21.1619, lon: -86.8515, country: 'MX' },
  { name: 'Nueva York', lat: 40.7128, lon: -74.006, country: 'US' },
  { name: 'Londres', lat: 51.5074, lon: -0.1278, country: 'GB' },
  { name: 'Tokio', lat: 35.6762, lon: 139.6503, country: 'JP' },
  { name: 'Madrid', lat: 40.4168, lon: -3.7038, country: 'ES' },
];

export default function WeatherPage() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<CityLocation>(CITIES[0]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  // Verificar autenticación
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Cargar datos del clima
  const loadWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Cargar clima actual y pronóstico en paralelo
      const [currentData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather({
          lat: selectedCity.lat,
          lon: selectedCity.lon,
          units,
          lang: 'es',
        }),
        weatherService.getForecastDaily({
          lat: selectedCity.lat,
          lon: selectedCity.lon,
          days: 7,
          units,
          lang: 'es',
        }),
      ]);

      setCurrentWeather(currentData.data[0]);
      setForecast(forecastData.data);
    } catch (err: any) {
      console.error('Error al cargar datos del clima:', err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Error al cargar los datos del clima. Verifica tu conexión y que la API Key esté configurada.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar y cuando cambie la ciudad o unidades
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      loadWeatherData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, units]);

  const handleCityChange = (city: CityLocation) => {
    setSelectedCity(city);
  };

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🌤️ Clima Mundial</h1>
          <p className="text-blue-100">Pronóstico del tiempo en tiempo real</p>
        </div>

        {/* Controles */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Selector de ciudad */}
            <div className="flex-1 w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona una ciudad:
              </label>
              <select
                value={`${selectedCity.lat},${selectedCity.lon}`}
                onChange={(e) => {
                  const [lat, lon] = e.target.value.split(',').map(Number);
                  const city = CITIES.find((c) => c.lat === lat && c.lon === lon);
                  if (city) handleCityChange(city);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 appearance-auto"
                style={{ color: '#000', backgroundColor: '#fff' }}
              >
                {CITIES.map((city) => (
                  <option 
                    key={`${city.lat},${city.lon}`} 
                    value={`${city.lat},${city.lon}`}
                    style={{ color: '#000', backgroundColor: '#fff' }}
                  >
                    {city.name}, {city.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle de unidades */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleUnits}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  units === 'metric'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                °C
              </button>
              <button
                onClick={toggleUnits}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  units === 'imperial'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                °F
              </button>
            </div>

            {/* Botón de actualizar */}
            <button
              onClick={loadWeatherData}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>{loading ? 'Cargando...' : '🔄 Actualizar'}</span>
            </button>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {/* Contenido principal */}
        {!loading && !error && currentWeather && (
          <>
            {/* Clima actual */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                📍 {selectedCity.name}, {selectedCity.country}
              </h2>
              <WeatherCard data={currentWeather} type="current" />
            </div>

            {/* Pronóstico de 7 días */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                📅 Pronóstico de 7 Días
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {forecast.map((day, index) => (
                  <WeatherCard key={`${day.ts}-${index}`} data={day} type="forecast" />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Botón para volver */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/books')}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg"
          >
            ← Volver a Libros
          </button>
        </div>
      </div>
    </div>
  );
}
