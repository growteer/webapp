"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn, type FieldValues } from "react-hook-form";
import type { z } from "zod";

/**
 * Type-safe form hook that integrates React Hook Form with Zod validation
 */
export function useTypedForm<T extends z.ZodSchema>(
  schema: T,
  options?: Parameters<typeof useForm<z.infer<T>>>[0]
): UseFormReturn<z.infer<T>> {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    ...options,
  });
}
