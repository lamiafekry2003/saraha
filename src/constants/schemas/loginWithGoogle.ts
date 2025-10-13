import { z } from "zod";
import { email,firstName,lastName} from "./generalField";

export const loginWithGoogleSchema = z.object({
    firstName,
    lastName,
    email,
   
})
export type LoginWithGoogleSchema = z.infer<typeof loginWithGoogleSchema>