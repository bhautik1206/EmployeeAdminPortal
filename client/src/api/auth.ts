import axiosClient from "./axiosClient";
import type { AuthResponse, LoginDto, RegisterDto, User } from "../types/auth";

export function login(dto: LoginDto) {
  return axiosClient.post<AuthResponse>("/auth/login", dto).then((res) => res.data);
}

export function register(dto: RegisterDto) {
  return axiosClient.post<AuthResponse>("/auth/register", dto).then((res) => res.data);
}

export function getMe() {
  return axiosClient.get<User>("/auth/me").then((res) => res.data);
}
