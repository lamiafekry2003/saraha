"use client";

// nextjs
import { useSearchParams } from "next/navigation";

// react
import { useRef } from "react";

// components
import Spinner from "@/components/shared/Spinner";
import OTPInpt from "./components/OTPInpt";
// shadcn
import { Button } from "@/components/ui/button";

// hooks
import useSubmitOTPForm from "@/hooks/useSubmitOTPForm";
import useRenderOTPPage from "@/hooks/useRenderOTPPage";

const OTPPage = () => {
  const email = useSearchParams().get("email") || "";

  const OTPInputRef = useRef<HTMLInputElement>(null);

  const isRender = useRenderOTPPage();

  const { handleSubmit, error, loading } = useSubmitOTPForm({
    OTPInputRef,
  });

  if (!isRender) return;

  if (!email)
    return (
      <h1 className="text-red-600 font-bold text-2xl">Email Not Found !</h1>
    );

  return (
    <div className="gap-4 flex flex-col items-center text-center">
      <h1 className="font-bold text-2xl text-indigo-600">Confirm Your Email</h1>
      <p className="font-semibold text-gray-600">
        We sent you a verification code on your email, please check your emails
        and put the code to confirm your email.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <OTPInpt ref={OTPInputRef} />

        <Button disabled={loading} className="w-full">
          {loading ? (
            <>
              <Spinner />
              Submiting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      {error && <p className="text-red-700 font-bold">{error}</p>}
    </div>
  );
};
export default OTPPage;
