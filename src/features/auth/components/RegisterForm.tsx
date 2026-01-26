"use client";

import { useTypedForm } from "@/lib/validation/form-helpers";
import { registerSchema, type RegisterFormData } from "@/lib/validation";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Register form component
 * Demonstrates the feature-sliced architecture pattern
 */
export function RegisterForm() {
  const { register: registerUser, isRegistering, registerError } = useAuth();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useTypedForm(registerSchema);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          id="name"
          type="text"
          {...registerField("name")}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...registerField("email")}
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
          {...registerField("password")}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...registerField("confirmPassword")}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {registerError && (
        <p className="text-sm text-destructive">
          {(registerError as Error).message ||
            "Registration failed. Please try again."}
        </p>
      )}

      <Button type="submit" disabled={isRegistering} className="w-full">
        {isRegistering ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
