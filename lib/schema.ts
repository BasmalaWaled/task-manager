import {z} from "zod"
export const userSchema = z.object({
    name:z.string()
    email: z.string().email(),
    .min(2, "Name is required"),
    .max(100, "Maximum is too long"),
    about: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    industry: z.string().min(1, "Industry is required"),
    role: z.string().min(1, "Role is required"),
    image : z.string().optional(),
});