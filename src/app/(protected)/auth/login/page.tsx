"use client";

// nextjs
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// react
import { useState } from "react";

// handle forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// redux
import useSelector from "@/hooks/redux/useSelector";
import useDispatch from "@/hooks/redux/useDispatch";
// actions
import { login } from "@/store/slices/authSlice";

// constants
import { loginSchema, type LoginSchema } from "@/constants/schemas/loginSchema";

// components
import AuthFormSubmitBtn from "../components/AuthFormSubmitBtn";
import AuthFormIllustrationSide from "../components/AuthFormIllustrationSide";
import loginFormInputs from "@/constants/loginFormInputs";
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
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const globalErrorMsg = "something wen't wrong while loging in";

    try {
      const result = await dispatch(login(data));

      if (login.fulfilled.match(result)) {
        router.push("/");
        setGlobalError("");
      } else {
        const errorData = result.payload as {
          message: string;
          redirect?: boolean;
        };

        if (errorData.redirect) {
          allowAccess();
          router.push(`/auth/otp?email=${data.email}`);
        }
        setGlobalError(errorData.message || globalErrorMsg);
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

          <h1 className="text-3xl font-bold text-indigo-700">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {loginFormInputs.map((input) => (
            <AuthFormInput
              errors={errors}
              key={input.inputId}
              register={register}
              {...input}
            />
          ))}

          <AuthFormSubmitBtn
            isPending={isPending}
            loadingText="Signing in..."
            normalText="Sign In"
          />
        </form>

        {globalError && (
          <p className="mt-1 text-sm text-red-600">{globalError}</p>
        )}

        <p className="text-sm text-center text-gray-600">
          {"Don't"} have an account?{" "}
          <Button asChild variant="link" className="p-0">
            <Link
              href="/auth/register"
              className="!text-indigo-700 hover:opacity-80"
            >
              Register
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
