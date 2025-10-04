import type { ComponentProps } from "react";
import type { registerSchema, RegisterSchema } from "./schemas/registerSchema";
import type { LoginSchema } from "./schemas/loginSchema";

export type User = Record<"email" | "_id" | "lastName" | "firstName", string>;

export type AuthInputType<T extends RegisterSchema | LoginSchema> = {
  type: ComponentProps<"input">["type"];
  placeholder: string;
  label: string;
  inputId: keyof T;
};
