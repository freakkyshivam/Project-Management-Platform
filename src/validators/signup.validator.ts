import { z } from "zod";

export const signupValidation = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  
  name: z.string()
    .trim()
    .min(6, "Name must be at least 6 characters long")
    .nonempty("Name is required"),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[@$!%*?&#]/, "Must contain at least one special character")
    .nonempty("Password is required"),
    
   

});

export const verifySignupValidation = z.object({
   email: z.string().email("Invalid email").nonempty("Email is required"),
  otp: z.string()
    .min(6, "OTP must be 6 characters")
    .max(6, "OTP must be 6 characters")
    .nonempty("OTP is required"),

     role: z.enum(["admin", "project_admin", "member"])
});

