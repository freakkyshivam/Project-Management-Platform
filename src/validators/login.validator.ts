import { z } from "zod";

export const loginValidation = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    // .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Must contain at least one number")
    // .regex(/[@$!%*?&#]/, "Must contain at least one special character")
    .nonempty("Password is required")
});
