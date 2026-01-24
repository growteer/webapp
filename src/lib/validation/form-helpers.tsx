"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";

/** Form values type: schema output intersected with FieldValues for RHF compat. */
type FormValues<T extends z.ZodTypeAny> = z.output<T> & Record<string, unknown>;

/**
 * Type-safe form hook that integrates React Hook Form with Zod validation.
 * Uses assertions to bridge Zod 4 and @hookform/resolvers typings.
 */
export function useTypedForm<T extends z.ZodTypeAny>(
  schema: T,
  options?: object
): UseFormReturn<FormValues<T>> {
  const form = useForm({
    resolver: zodResolver(schema as never),
    mode: "onBlur",
    ...options,
  });
  return form as unknown as UseFormReturn<FormValues<T>>;
}
