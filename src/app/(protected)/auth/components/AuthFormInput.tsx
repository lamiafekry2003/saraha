// types
import type { LoginSchema } from "@/constants/schemas/loginSchema";
import type { RegisterSchema } from "@/constants/schemas/registerSchema";
import type { AuthInputType } from "@/constants/types";
import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";

// using "RegisterSchema" because it's contain all fields from LoginSchema
type Props<T extends RegisterSchema | LoginSchema> = AuthInputType<T> & {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

const AuthFormInput = <T extends RegisterSchema | LoginSchema>({
  inputId,
  label,
  placeholder,
  type,
  register,
  errors,
}: Props<T>) => {
  return (
    <div>
      <label
        htmlFor={inputId as string}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputId as string}
        type={type}
        {...register(inputId as unknown as Path<T>)}
        className={`mt-1 block w-full px-3 py-2 border rounded-md ${
          errors[inputId as keyof typeof errors]
            ? "border-red-500"
            : "border-gray-800"
        }`}
        placeholder={placeholder}
      />
      {errors[inputId as keyof typeof errors] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[inputId]?.message as string}
        </p>
      )}
    </div>
  );
};
export default AuthFormInput;
