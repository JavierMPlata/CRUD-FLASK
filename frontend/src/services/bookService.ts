import apiClient from '@/lib/apiClient';
import {
  Book,
  CreateBookData,
  UpdateBookData,
  BooksResponse,
  BookResponse,
} from '@/types/book.types';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api.types';

class BookService {
  private static instance: BookService;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

  private constructor() {}

  public static getInstance(): BookService {
    if (!BookService.instance) {
      BookService.instance = new BookService();
    }
    return BookService.instance;
  }

  private getCacheKey(endpoint: string): string {
    return endpoint;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  private getCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data as T;
    }
    this.cache.delete(key);
    return null;
  }

  private invalidateCache(pattern?: string): void {
    if (pattern) {
      const keys = Array.from(this.cache.keys());
      keys.forEach((key) => {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      });
    } else {
      this.cache.clear();
    }
  }

  async getAllBooks(useCache = true): Promise<BooksResponse> {
    try {
      const cacheKey = this.getCacheKey('/app/books');
      
      if (useCache) {
        const cached = this.getCache<BooksResponse>(cacheKey);
        if (cached) {
          return cached;
        }
      }

      const response = await apiClient.get<BooksResponse>('/app/books');
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Error al obtener libros'
      );
    }
  }

  async getBookById(id: number, useCache = true): Promise<BookResponse> {
    try {
      const cacheKey = this.getCacheKey(`/app/books/${id}`);
      
      if (useCache) {
        const cached = this.getCache<BookResponse>(cacheKey);
        if (cached) {
          return cached;
        }
      }

      const response = await apiClient.get<BookResponse>(`/app/books/${id}`);
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Error al obtener libro'
      );
    }
  }

  async createBook(data: CreateBookData): Promise<BookResponse> {
    try {
      const response = await apiClient.post<BookResponse>('/app/books', data);
      this.invalidateCache('/app/books');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Error al crear libro'
      );
    }
  }

  async updateBook(id: number, data: UpdateBookData): Promise<BookResponse> {
    try {
      const response = await apiClient.put<BookResponse>(`/app/books/${id}`, data);
      this.invalidateCache(`/app/books`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Error al actualizar libro'
      );
    }
  }

  async deleteBook(id: number): Promise<{ message: string }> {
    try {
      const response = await apiClient.delete<{ message: string }>(`/app/books/${id}`);
      this.invalidateCache('/app/books');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Error al eliminar libro'
      );
    }
  }

  clearCache(): void {
    this.invalidateCache();
  }
}

export default BookService.getInstance();
