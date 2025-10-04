import { RegisterSchema } from "./schemas/registerSchema";
import type { AuthInputType } from "./types";

const registerFormInputs: AuthInputType<RegisterSchema>[] = [
  {
    inputId: "firstName",
    type: "text",
    placeholder: "Enter Your First Name",
    label: "First Name",
  },
  {
    inputId: "lastName",
    type: "text",
    placeholder: "Enter Your Last Name",
    label: "Last Name",
  },
  {
    inputId: "email",
    type: "email",
    placeholder: "Enter Your Email",
    label: "Email",
  },
  {
    inputId: "phoneNumber",
    type: "tel",
    placeholder: "Enter Your Phone Number",
    label: "Phone Number",
  },
  {
    inputId: "password",
    type: "password",
    placeholder: "Enter Your Password",
    label: "Password",
  },
];

export default registerFormInputs;
