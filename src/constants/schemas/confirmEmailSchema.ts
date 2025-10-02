import { z } from "zod";
import { email,otp } from "./generalField";

export const confirmEmail = z.object({
    email,
    otp
})
export type ConfirmEmail = z.infer<typeof confirmEmail>