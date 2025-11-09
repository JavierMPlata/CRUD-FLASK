/**
 * Componente para mostrar información del clima
 */
import React from 'react';
import type { CurrentWeatherData, DailyForecastData } from '@/types/weather.types';

interface WeatherCardProps {
  data: CurrentWeatherData | DailyForecastData;
  type: 'current' | 'forecast';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, type }) => {
  const isCurrent = type === 'current';
  const currentData = isCurrent ? (data as CurrentWeatherData) : null;
  const forecastData = !isCurrent ? (data as DailyForecastData) : null;

  const temp = isCurrent ? (currentData?.temp ?? 0) : (forecastData?.temp ?? 0);
  const weather = data.weather;
  const humidity = data.rh;
  const windSpeed = data.wind_spd;
  const windDir = data.wind_cdir_full;
  const precip = data.precip;

  // Obtener icono del clima
  const getWeatherIcon = (code: number) => {
    if (code >= 200 && code < 300) return '⛈️'; // Tormenta
    if (code >= 300 && code < 400) return '🌦️'; // Llovizna
    if (code >= 500 && code < 600) return '🌧️'; // Lluvia
    if (code >= 600 && code < 700) return '❄️'; // Nieve
    if (code >= 700 && code < 800) return '🌫️'; // Niebla
    if (code === 800) return '☀️'; // Despejado
    if (code > 800) return '☁️'; // Nublado
    return '🌤️';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {isCurrent ? (
            <h3 className="text-lg font-semibold text-gray-700">Clima Actual</h3>
          ) : (
            <h3 className="text-lg font-semibold text-gray-700">
              {new Date(forecastData!.valid_date).toLocaleDateString('es-ES', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </h3>
          )}
        </div>
        <div className="text-5xl">
          {getWeatherIcon(weather.code)}
        </div>
      </div>

      {/* Temperatura */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold text-gray-800">
            {Math.round(temp)}°
          </span>
          {!isCurrent && forecastData && (
            <div className="ml-4 text-sm text-gray-600">
              <div>Max: {Math.round(forecastData.max_temp)}°</div>
              <div>Min: {Math.round(forecastData.min_temp)}°</div>
            </div>
          )}
        </div>
        <p className="text-gray-600 mt-2 capitalize">{weather.description}</p>
      </div>

      {/* Detalles */}
      <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-500">💧</span>
          <div>
            <p className="text-gray-500">Humedad</p>
            <p className="font-semibold text-gray-700">{Math.round(humidity)}%</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500">💨</span>
          <div>
            <p className="text-gray-500">Viento</p>
            <p className="font-semibold text-gray-700">
              {Math.round(windSpeed)} m/s {windDir}
            </p>
          </div>
        </div>

        {precip > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">🌧️</span>
            <div>
              <p className="text-gray-500">Precipitación</p>
              <p className="font-semibold text-gray-700">{precip} mm</p>
            </div>
          </div>
        )}

        {isCurrent && currentData && (
          <>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">☀️</span>
              <div>
                <p className="text-gray-500">UV</p>
                <p className="font-semibold text-gray-700">{currentData.uv.toFixed(1)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-orange-500">🌅</span>
              <div>
                <p className="text-gray-500">Amanecer</p>
                <p className="font-semibold text-gray-700">{currentData.sunrise}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-purple-500">🌇</span>
              <div>
                <p className="text-gray-500">Atardecer</p>
                <p className="font-semibold text-gray-700">{currentData.sunset}</p>
              </div>
            </div>
          </>
        )}

        {!isCurrent && forecastData && forecastData.pop > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">☔</span>
            <div>
              <p className="text-gray-500">Prob. lluvia</p>
              <p className="font-semibold text-gray-700">{forecastData.pop}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
