export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface APIError {
  message: string;
  code?: string;
  field?: string;
}

export interface APIResponse<T> {
  data?: T;
  error?: APIError;
  success: boolean;
}

export interface APIClientConfig {
  baseURL?: string;
  defaultHeaders?: HeadersInit;
  defaultRequestTimeoutMs?: number;
  authStorageKey?: string;
  unauthorizedRedirectPath?: string;
}

export interface APIRequestConfig {
  headers?: HeadersInit;
  signal?: AbortSignal;
  timeout?: number;
  cache?: RequestCache;
  credentials?: RequestCredentials;
}