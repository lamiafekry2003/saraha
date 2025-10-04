"use client";

// nextjs
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// react
import { useState } from "react";

// handle forms
import { type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// redux
import useSelector from "@/hooks/redux/useSelector";
import useDispatch from "@/hooks/redux/useDispatch";
// actions
import { register as registerThunkAction } from "@/store/slices/authSlice";

// constants
import {
  registerSchema,
  type RegisterSchema,
} from "@/constants/schemas/registerSchema";
import registerFormInputs from "@/constants/registerFormInputs";

// components
import AuthFormIllustrationSide from "../components/AuthFormIllustrationSide";
import RegisterFormRadioField from "../components/RegisterFormRadioField";
import AuthFormSubmitBtn from "../components/AuthFormSubmitBtn";
import AuthFormInput from "../components/AuthFormInput";

// shadcn
import { Button } from "@/components/ui/button";

// utils
import { allowAccess } from "@/lib/allowAccessOnOPTPage";

export default function LoginPage() {
  const dispatch = useDispatch();

  const router = useRouter();

  const { isPending } = useSelector((state) => state.auth);

  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterSchema>,
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "male",
      role: "USER",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    const globalErrorMsg =
      "can't resgister you at the momment, try again later";

    try {
      const result = await dispatch(registerThunkAction(data));

      if (registerThunkAction.fulfilled.match(result)) {
        allowAccess();
        router.push(`/auth/otp?email=${data.email}`);
        setGlobalError("");
      } else {
        setGlobalError(
          typeof result.payload !== "string" ? globalErrorMsg : result.payload
        );
      }
    } catch {
      setGlobalError(globalErrorMsg);
    }
  };

  return (
    <div className="flex items-center gap-8 text-gray-800">
      <AuthFormIllustrationSide />

      <div className="border border-indigo-400 space-y-8 p-8 flex-1 shadow-md rounded-md shadow-indigo-900/65">
        <div className="text-center space-y-3">
          <Image
            src="/logos/logoWithText.svg"
            alt="logo"
            width={200}
            height={200}
            className="max-w-full aspect-[1] object-contain mx-auto"
            priority
          />

          <h1 className="text-3xl font-bold text-indigo-700">Register</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {registerFormInputs.map((input) => (
            <AuthFormInput
              errors={errors}
              key={input.inputId}
              register={register}
              {...input}
            />
          ))}

          <div className="flex items-center flex-wrap gap-4 ">
            <RegisterFormRadioField
              inputsId="gender"
              title="Your Gender"
              values={["male", "female"]}
              errors={errors}
              register={register}
            />
            <RegisterFormRadioField
              inputsId="role"
              title="Your Role"
              values={["USER", "ADMIN"]}
              errors={errors}
              register={register}
            />
          </div>

          <AuthFormSubmitBtn
            isPending={isPending}
            normalText="Register"
            loadingText="Registering..."
          />
        </form>

        {globalError && (
          <p className="mt-1 text-sm text-red-600">{globalError}</p>
        )}

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Button asChild variant="link" className="p-0">
            <Link
              href="/auth/login"
              className="!text-indigo-700 hover:opacity-80"
            >
              Sign In
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
