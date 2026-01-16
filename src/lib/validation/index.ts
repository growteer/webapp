import { z } from "zod";

// Export all validation schemas
export * from "./schemas";

// Helper function to get field error from Zod error
export function getFieldError(
  errors: { field?: string; message: string }[],
  fieldName: string
): string | undefined {
  return errors.find((error) => error.field === fieldName)?.message;
}

// Helper function to format Zod errors for form display
export function formatZodErrors(
  error: z.ZodError
): { field?: string; message: string }[] {
  return error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
}
