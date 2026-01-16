// App-wide constants

export const APP_NAME = "Growteer";

export const SUPPORTED_LOCALES = ["en", "de"];
export const DEFAULT_LOCALE = "en";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  FEED: "/feed",
} as const;
