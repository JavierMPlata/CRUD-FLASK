// Types for User
export interface User {
  id: number;
  username: string;
  email: string;
  created_at?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  login: string; // Can be username or email
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
