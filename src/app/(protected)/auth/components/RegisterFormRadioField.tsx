import { RegisterSchema } from "@/constants/schemas/registerSchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<RegisterSchema>;
  errors: FieldErrors<RegisterSchema>;
  inputsId: keyof RegisterSchema;
  values: string[];
  title: string;
};
const RegisterFormRadioField = ({
  register,
  errors,
  inputsId,
  values,
  title,
}: Props) => {
  return (
    <div
      className={`border w-fit p-3 rounded-md flex-1 ${
        errors[inputsId]?.message ? "!border-red-600" : "border-indigo-600"
      }`}
    >
      <h2 className="font-bold text-indigo-600 text-2xl">{title}</h2>

      <div className="flex items-center justify-around gap-2.5 flex-wrap mt-4">
        {values.map((value, i) => (
          <label
            key={value}
            htmlFor={inputsId + i}
            className="block text-sm font-medium text-gray-700"
          >
            <input
              defaultChecked={i === 0}
              id={inputsId + i}
              type="radio"
              value={value}
              {...register(inputsId)}
              className="mt-1 block w-full px-3 py-2 border rounded-md capitalize"
            />
            {value}
          </label>
        ))}

        {errors[inputsId] && (
          <p className="mt-1 text-sm text-red-600">
            {errors[inputsId].message}
          </p>
        )}
      </div>
    </div>
  );
};
export default RegisterFormRadioField;
