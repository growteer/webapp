import { z } from "zod";

export * from "./schemas";

// Get field error from Zod error
export function getFieldError(
  errors: { field?: string; message: string }[],
  fieldName: string
): string | undefined {
  return errors.find((error) => error.field === fieldName)?.message;
}

// Format Zod errors for form display
export function formatZodErrors(
  error: z.ZodError
): { field?: string; message: string }[] {
  return error.issues.map((issue) => ({
    field: issue.path.map(String).join("."),
    message: issue.message,
  }));
}
