import { z } from "zod";

/**
 * Single source of truth for login validation AND its TypeScript type.
 * Kept in its own file so the checkout form in the Next.js module can reuse it.
 */
export const loginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z
    .string()
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .max(64, "Mật khẩu tối đa 64 ký tự"),
  remember: z.boolean().default(false),
});

/** Values after parsing — inferred from the schema, never written by hand. */
export type LoginValues = z.infer<typeof loginSchema>;

/** Values as the form holds them before parsing (defaults not applied yet). */
export type LoginInput = z.input<typeof loginSchema>;
