import { z } from "zod";
import { email,password } from "./generalField";

export const loginSchema = z.object({
    email,
    password
})
export type LoginSchema = z.infer<typeof loginSchema>