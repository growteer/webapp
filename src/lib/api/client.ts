import { API_BASE_URL } from "@/lib/constants";
import type { ApiError, ApiResponse } from "@/types/common";

// Extend this interface when API types are auto-generated
interface ApiClientConfig extends RequestInit {
  baseURL?: string;
  timeout?: number;
}

interface ApiErrorResponse {
  message: string;
  code?: string;
  field?: string;
  errors?: Array<{ field: string; message: string }>;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    config: ApiClientConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      baseURL = this.baseURL,
      headers = {},
      timeout = 30000,
      ...fetchConfig
    } = config;

    const url = endpoint.startsWith("http") ? endpoint : `${baseURL}${endpoint}`;

    // Merge default headers with custom headers
    const mergedHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    // Add auth token if available
    const authToken = this.getAuthToken();
    if (authToken) {
      mergedHeaders["Authorization"] = `Bearer ${authToken}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchConfig,
        headers: mergedHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error: ApiError = {
          message:
            (data as ApiErrorResponse).message ||
            `HTTP Error: ${response.status} ${response.statusText}`,
          code: (data as ApiErrorResponse).code || `HTTP_${response.status}`,
          field: (data as ApiErrorResponse).field,
        };

        // Handle 401 Unauthorized - clear auth and redirect to login
        if (response.status === 401) {
          this.handleUnauthorized();
        }

        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return {
          success: false,
          error: {
            message: "Request timeout",
            code: "TIMEOUT",
          },
        };
      }

      return {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : "An unexpected error occurred",
          code: "NETWORK_ERROR",
        },
      };
    }
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;

    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (!authStorage) return null;

      const parsed = JSON.parse(authStorage);
      return parsed.state?.accessToken || null;
    } catch {
      return null;
    }
  }

  private handleUnauthorized(): void {
    if (typeof window === "undefined") return;

    // Clear auth storage
    localStorage.removeItem("auth-storage");

    // Redirect to login if not already there
    if (!window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }
  }

  async get<T>(endpoint: string, config?: ApiClientConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: ApiClientConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: ApiClientConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: ApiClientConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, config?: ApiClientConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for custom instances if needed
export { ApiClient };
