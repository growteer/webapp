import { z } from "zod";

// Common validation schemas that can be reused across the application

// Email validation
export const emailSchema = z.string().email("Invalid email address");

// Password validation
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// Common string schemas
export const nonEmptyStringSchema = z.string().min(1, "This field is required");

// Date schemas
export const dateSchema = z.coerce.date();
export const dateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format");

// Example: Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: nonEmptyStringSchema,
});

// Example: Register form schema
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Export types inferred from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
