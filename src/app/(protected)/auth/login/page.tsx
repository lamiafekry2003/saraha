"use client";

// nextjs
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
import Spinner from "@/components/shared/Spinner";
// shadcn
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
    try {
      const result = await dispatch(login(data));

      if (login.fulfilled.match(result)) {
        router.push("/");
        setGlobalError("");
      } else {
        setGlobalError("Invalid Username or Password");
      }
    } catch {
      setGlobalError("something wen't wrong while login");
    }
  };

  return (
    <div className="flex items-center gap-8 text-gray-800">
      <div className="flex-[0.8] max-md:hidden space-y-2 text-center">
        <Image
          src="/illustrations/messages.svg"
          alt="message illustration"
          width={300}
          height={300}
          className="max-w-full object-contain aspect-[1] mx-auto"
        />
        <p className="font-bold text-indigo-700 text-4xl">
          Share Your Truth Without Fear
        </p>

        <p className="text-indigo-500 font-semibold">
          Receive honest feedback and messages from friends, colleagues, and
          anyone who knows your link. 100% anonymous, 100% real.
        </p>
      </div>

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

          <h2 className="text-3xl font-bold text-indigo-700">Sign In</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-800"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-800"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full p-3"
            style={{ height: "unset" }}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Spinner />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
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
