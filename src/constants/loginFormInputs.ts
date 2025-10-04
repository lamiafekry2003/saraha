import type { LoginSchema } from "./schemas/loginSchema";
import type { AuthInputType } from "./types";

const loginFormInputs: AuthInputType<LoginSchema>[] = [
  {
    inputId: "email",
    type: "email",
    placeholder: "Enter Your Email",
    label: "Email",
  },

  {
    inputId: "password",
    type: "password",
    placeholder: "Enter Your Password",
    label: "Password",
  },
];

export default loginFormInputs;
