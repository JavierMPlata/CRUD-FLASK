import apiClient from '@/lib/apiClient';
import {
  RegisterData,
  LoginData,
  LoginResponse,
  RegisterResponse,
  User,
} from '@/types/user.types';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api.types';

class AuthService {
  private static instance: AuthService;

  private constructor() {
    // Limpiar localStorage si existe data antigua y migrar a sessionStorage
    this.migrateToSessionStorage();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Método para migrar de localStorage a sessionStorage
  private migrateToSessionStorage(): void {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('token');
      const localUser = localStorage.getItem('user');
      
      // Si hay datos en localStorage, limpiarlos
      if (localToken || localUser) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }

  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Error al registrar usuario'
      );
    }
  }

  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', data);
      
      // Store token and user in sessionStorage (se borra al cerrar el navegador)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', response.data.access_token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Error al iniciar sesión'
      );
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = sessionStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Decodificar JWT token
  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Obtener información del token
  getTokenInfo(): {
    token: string;
    decoded: any;
    expiresAt: Date | null;
    timeRemaining: string;
    isExpired: boolean;
  } | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    if (!decoded) return null;

    const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : null;
    const now = new Date();
    const isExpired = expiresAt ? expiresAt < now : false;
    
    let timeRemaining = 'Expirado';
    if (expiresAt && !isExpired) {
      const diff = expiresAt.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Si es menos de 1 minuto, mostrar solo segundos
      if (hours === 0 && minutes === 0) {
        timeRemaining = `${seconds}s`;
      } else if (hours === 0) {
        timeRemaining = `${minutes}m ${seconds}s`;
      } else {
        timeRemaining = `${hours}h ${minutes}m ${seconds}s`;
      }
    }

    return {
      token,
      decoded,
      expiresAt,
      timeRemaining,
      isExpired,
    };
  }
}

export default AuthService.getInstance();
