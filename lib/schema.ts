import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Maximum is too long"),

  email: z.string().email("Invalid email address"),

  about: z.string().optional(),

  country: z.string().min(1, "Country is required"),

  industry: z.string().min(1, "Industry is required"),

  industryType: z.string().optional(),

  role: z.string().min(1, "Role is required"),

  image: z.string().optional(),
});
