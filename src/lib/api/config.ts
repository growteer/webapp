import {
  API_BASE_URL,
  AUTH_STORAGE_KEY,
  ROUTES,
} from "@/lib/constants";

export const apiConfig = {
  baseURL: API_BASE_URL,
  defaultRequestTimeoutMs: 30_000,
  authStorageKey: AUTH_STORAGE_KEY,
  unauthorizedRedirectPath: ROUTES.SIGNIN,
} as const;
