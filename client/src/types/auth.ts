export type Role = "Admin" | "Manager" | "Employee";

export interface User {
  id: string;
  email: string;
  role: Role;
  employeeId?: string | null;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  role: Role;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  role: Role;
  employeeId?: string | null;
}
