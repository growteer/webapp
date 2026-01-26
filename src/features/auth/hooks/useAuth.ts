"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { login, register, logout, getCurrentUser } from "../api/auth";
import type { LoginRequest, RegisterRequest } from "../types";

/**
 * Custom hook for authentication operations
 * Integrates TanStack Query for server state and Zustand for client state
 */
export function useAuth() {
  const { user, isAuthenticated, login: setAuth, logout: clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch current user
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["auth", "current-user"],
    queryFn: async () => {
      const response = await getCurrentUser();
      if (response.success && response.data) {
        setAuth(response.data.user, ""); // Token is stored separately
        return response.data.user;
      }
      return null;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setAuth(response.data.user, response.data.accessToken);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setAuth(response.data.user, response.data.accessToken);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });

  return {
    user: currentUser || user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
