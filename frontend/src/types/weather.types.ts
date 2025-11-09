/**
 * Tipos para la API de Clima (Weatherbit)
 */

export interface WeatherDescription {
  code: number;
  description: string;
  icon: string;
}

export interface CurrentWeatherData {
  city_name: string;
  country_code: string;
  lat: number;
  lon: number;
  timezone: string;
  temp: number;
  app_temp: number;
  rh: number;
  wind_spd: number;
  wind_cdir: string;
  wind_cdir_full: string;
  clouds: number;
  precip: number;
  snow: number;
  uv: number;
  aqi: number;
  weather: WeatherDescription;
  datetime: string;
  ob_time: string;
  ts: number;
  sunrise: string;
  sunset: string;
}

export interface CurrentWeatherResponse {
  count: number;
  data: CurrentWeatherData[];
}

export interface ForecastData {
  timestamp_local: string;
  timestamp_utc: string;
  ts: number;
  temp: number;
  app_temp: number;
  rh: number;
  wind_spd: number;
  wind_cdir: string;
  wind_cdir_full: string;
  clouds: number;
  precip: number;
  snow: number;
  weather: WeatherDescription;
  pop: number;
  pres: number;
  dewpt: number;
}

export interface ForecastResponse {
  city_name: string;
  country_code: string;
  lat: number;
  lon: number;
  state_code: string;
  timezone: string;
  data: ForecastData[];
}

export interface DailyForecastData {
  valid_date: string;
  ts: number;
  datetime: string;
  temp: number;
  max_temp: number;
  min_temp: number;
  app_max_temp: number;
  app_min_temp: number;
  rh: number;
  clouds: number;
  wind_spd: number;
  wind_cdir: string;
  wind_cdir_full: string;
  precip: number;
  snow: number;
  snow_depth: number;
  pop: number;
  weather: WeatherDescription;
  uv: number;
  max_dhi: number;
  sunrise_ts: number;
  sunset_ts: number;
}

export interface DailyForecastResponse {
  city_name: string;
  country_code: string;
  lat: number;
  lon: number;
  state_code: string;
  timezone: string;
  data: DailyForecastData[];
}

export interface WeatherQueryParams {
  lat: number;
  lon: number;
  units?: 'metric' | 'imperial';
  lang?: string;
  days?: number;
}

export interface CityLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
}
