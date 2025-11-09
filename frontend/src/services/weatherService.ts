/**
 * Servicio para consumir la API de Clima
 */
import apiClient from '@/lib/apiClient';
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  DailyForecastResponse,
  WeatherQueryParams,
} from '@/types/weather.types';

class WeatherService {
  private basePath = '/weather';

  /**
   * Obtener clima actual
   */
  async getCurrentWeather(params: WeatherQueryParams): Promise<CurrentWeatherResponse> {
    const { lat, lon, units = 'metric', lang = 'es' } = params;
    
    const response = await apiClient.get<CurrentWeatherResponse>(
      `${this.basePath}/current`,
      {
        params: { lat, lon, units, lang },
      }
    );
    
    return response.data;
  }

  /**
   * Obtener pronóstico cada 3 horas
   */
  async getForecast3Hourly(params: WeatherQueryParams): Promise<ForecastResponse> {
    const { lat, lon, units = 'metric', lang = 'es' } = params;
    
    const response = await apiClient.get<ForecastResponse>(
      `${this.basePath}/forecast/3hourly`,
      {
        params: { lat, lon, units, lang },
      }
    );
    
    return response.data;
  }

  /**
   * Obtener pronóstico diario
   */
  async getForecastDaily(params: WeatherQueryParams): Promise<DailyForecastResponse> {
    const { lat, lon, days = 7, units = 'metric', lang = 'es' } = params;
    
    const response = await apiClient.get<DailyForecastResponse>(
      `${this.basePath}/forecast/daily`,
      {
        params: { lat, lon, days, units, lang },
      }
    );
    
    return response.data;
  }
}

export const weatherService = new WeatherService();
