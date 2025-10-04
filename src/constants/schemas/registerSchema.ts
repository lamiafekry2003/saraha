import { z } from "zod";
import {
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  gender,
  role,
} from "./generalField";

export const registerSchema = z.object({
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  gender,
  role,
});
export type RegisterSchema = z.infer<typeof registerSchema>;
