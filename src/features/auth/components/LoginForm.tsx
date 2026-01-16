"use client";

import { useTypedForm } from "@/lib/validation/form-helpers";
import { loginSchema, type LoginFormData } from "@/lib/validation";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Login form component
 * Demonstrates the feature-sliced architecture pattern:
 * - Uses feature-specific hooks (useAuth)
 * - Uses shared validation utilities
 * - Uses shared UI components
 */
export function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useTypedForm(loginSchema);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      // Error handling is done in the useAuth hook
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {loginError && (
        <p className="text-sm text-destructive">
          {(loginError as Error).message || "Login failed. Please try again."}
        </p>
      )}

      <Button type="submit" disabled={isLoggingIn} className="w-full">
        {isLoggingIn ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
