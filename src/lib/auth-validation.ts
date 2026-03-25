import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ange en giltig e-postadress"),
  password: z.string().min(1, "Lösenord krävs"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    first_name: z.string().min(2, "Förnamn måste vara minst 2 tecken"),
    last_name: z.string().min(2, "Efternamn måste vara minst 2 tecken"),
    email: z.string().email("Ange en giltig e-postadress"),
    password: z.string().min(8, "Lösenord måste vara minst 8 tecken"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lösenorden matchar inte",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  full_name: z.string().min(2, "Namn måste vara minst 2 tecken"),
  municipality: z.string().optional(),
  job_title: z.string().optional(),
});

export type ProfileValues = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Lösenord måste vara minst 8 tecken"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Lösenorden matchar inte",
    path: ["confirmPassword"],
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
