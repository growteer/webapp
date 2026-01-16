// Manual API types (for types not covered by auto-generated API types)
// Most API types will be auto-generated from OpenAPI/GraphQL schema in lib/api/generated/

// Example structure - will be replaced/expanded by generated types
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}
