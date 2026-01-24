import { apiConfig } from "./config";
import type {
  APIError,
  APIRequestConfig,
  APIClientConfig,
  APIResponse,
} from "./types";

class APIClient {
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly defaultRequestTimeoutMs: number;
  //TODO: the client should take an interface with methods that encapsulate auth/storage logic
  private readonly authStorageKey: string;
  private readonly unauthorizedRedirectPath: string;

  constructor(config: APIClientConfig = {}) {
    this.baseURL = config.baseURL ?? apiConfig.baseURL;
    this.defaultRequestTimeoutMs =
      config.defaultRequestTimeoutMs ?? apiConfig.defaultRequestTimeoutMs;
    this.authStorageKey = config.authStorageKey ?? apiConfig.authStorageKey;
    this.unauthorizedRedirectPath =
      config.unauthorizedRedirectPath ?? apiConfig.unauthorizedRedirectPath;
    this.defaultHeaders = config.defaultHeaders ?? {
      "Content-Type": "application/json",
    };
  }

  private async request<T, S extends BodyInit | null>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body: S,
    requestConfig: APIRequestConfig = {}
  ): Promise<APIResponse<T>> {
    const {
      headers: requestHeaders = {},
      signal: requestSignal,
      timeout: requestTimeout,
      cache,
      credentials,
    } = requestConfig;

    const url = endpoint.startsWith("https")
      ? endpoint
      : `${this.baseURL}${endpoint}`;

    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...requestHeaders,
    };
    const token = this.getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const timeoutMs = requestTimeout ?? this.defaultRequestTimeoutMs;
    const controller = new AbortController();
    const signal = requestSignal ?? controller.signal;
    const timeoutId =
      !requestSignal && timeoutMs > 0
        ? setTimeout(() => controller.abort(), timeoutMs)
        : undefined;

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal,
        cache,
        credentials,
      });

      if (timeoutId) clearTimeout(timeoutId);

      //TODO: better typing once we have generated api types
      const data = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        const error: APIError = {
          message:
            (data as APIError).message ||
            `HTTP Error: ${response.status} ${response.statusText}`,
          code: (data as APIError).code ?? `HTTP_${response.status}`,
          field: (data as APIError).field,
        };

        if (response.status === 401) this.handleUnauthorized();

        return { success: false, error };
      }

      return { success: true, data: data as T };
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);

      if (err instanceof Error && err.name === "AbortError") {
        return {
          success: false,
          error: { message: "Request timeout", code: "TIMEOUT" },
        };
      }

      return {
        success: false,
        error: {
          message:
            err instanceof Error ? err.message : "An unexpected error occurred",
          code: "NETWORK_ERROR",
        },
      };
    }
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(this.authStorageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { state?: { accessToken?: string } };
      return parsed.state?.accessToken ?? null;
    } catch {
      return null;
    }
  }

  private handleUnauthorized(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.authStorageKey);
    const path = this.unauthorizedRedirectPath;
    if (!window.location.pathname.includes(path)) {
      window.location.href = path;
    }
  }

  async get<T>(
    endpoint: string,
    requestConfig?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T, null>(endpoint, "GET", null, requestConfig);
  }

  async post<T, S extends BodyInit | null>(
    endpoint: string,
    data: S,
    requestConfig?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T, S>(endpoint, "POST", data, requestConfig);
  }

  async put<T, S extends BodyInit | null>(
    endpoint: string,
    data: S,
    requestConfig?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T, S>(endpoint, "PUT", data, requestConfig);
  }

  async patch<T, S extends BodyInit | null>(
    endpoint: string,
    data: S,
    requestConfig?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T, S>(endpoint, "PATCH", data, requestConfig);
  }

  async delete<T>(
    endpoint: string,
    requestConfig?: APIRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T, null>(endpoint, "DELETE", null, requestConfig);
  }
}

export const apiClient = new APIClient();
export { APIClient };
