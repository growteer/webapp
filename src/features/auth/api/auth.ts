import { apiClient } from "@/lib/api";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types";

/**
 * Authentication API functions
 * These functions use the centralized API client to make requests
 */

//TODO: review this whole feature
export async function login(credentials: LoginRequest) {
  return apiClient.post<AuthResponse>("/auth/login", credentials);
}

export async function register(data: RegisterRequest) {
  return apiClient.post<AuthResponse>("/auth/register", data);
}

export async function logout() {
  return apiClient.post("/auth/logout", {});
}

export async function refreshToken(refreshToken: string) {
  return apiClient.post<AuthResponse>("/auth/refresh", { refreshToken });
}

export async function getCurrentUser() {
  return apiClient.get<AuthResponse>("/auth/me");
}
