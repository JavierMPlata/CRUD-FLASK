// Types for Book
export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number;
  editorial?: string;
  genre?: string;
  language?: string;
  pages?: number;
  isbn: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBookData {
  title: string;
  author: string;
  published_year: number;
  editorial?: string;
  genre?: string;
  language?: string;
  pages?: number;
  isbn: string;
}

export interface UpdateBookData {
  title?: string;
  author?: string;
  published_year?: number;
  editorial?: string;
  genre?: string;
  language?: string;
  pages?: number;
  isbn?: string;
}

export interface BooksResponse {
  books: Book[];
  total: number;
}

export interface BookResponse {
  message: string;
  book: Book;
}
