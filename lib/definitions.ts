import { z } from 'zod'
 
export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "username is required" })
      .max(50, { message: "username cannot exceed 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password1: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
    password2: z.string(),
    role: z.enum(["seeker", "provider"]),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"], // Target the confirmPassword field
    message: "Passwords must match",
  });

  export interface SessionPayload {
    username: string;
    email: string;
    profile_picture?: string;
    role: 'seeker' | 'provider';
    token: string 
} 