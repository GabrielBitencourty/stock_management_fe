import { z } from "zod";

export const loginSchema = z.object({
  userEmail: z
    .string()
    .min(1, "Please add your email.")
    .email("Please add a valid email!"),

  password: z
    .string()
    .min(1, "Please add your password.")
    .min(8, "The password must be at least 8 characters long."),
});

export type LoginFormData = z.infer<typeof loginSchema>;