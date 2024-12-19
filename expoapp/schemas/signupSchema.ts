import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8)
      .superRefine((value, ctx) => {
        if (
          !/[A-Z]/.test(value) ||
          !/[a-z]/.test(value) ||
          !/[0-9]/.test(value) ||
          !/[^a-zA-Z0-9]/.test(value) ||
          value.length < 8
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long",
          });
        }
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    userRole: z
      .object({
        value: z.string(),
        label: z.string(),
      })
      .optional()
      .refine((value) => value !== undefined),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
