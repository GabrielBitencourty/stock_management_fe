import { z } from "zod";

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(3, "Name must have at least 3 characters")
      .max(50, "Name is too long"),

    userEmail: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;