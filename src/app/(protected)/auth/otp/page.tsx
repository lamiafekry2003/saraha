"use client";

// react
import { Suspense, useRef } from "react";

// components
import Spinner from "@/components/shared/Spinner";
import OTPInpt from "./components/OTPInpt";
// shadcn
import { Button } from "@/components/ui/button";

// hooks
import useSubmitOTPForm from "@/hooks/useSubmitOTPForm";
import useRenderOTPPage from "@/hooks/useRenderOTPPage";

const OTPPage = () => {
  const OTPInputRef = useRef<HTMLInputElement>(null);

  const isRender = useRenderOTPPage();

  const { handleSubmit, error, loading, isNoEmail } = useSubmitOTPForm({
    OTPInputRef,
  });

  if (!isRender) return;
  if (isNoEmail === "NO_EMAIL_FOUNDED")
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

const OTPPageWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex-col gap-4 flex items-center justify-center">
          <div className="max-[280px]:size-[100px] animate-spin rounded-full size-44 max-w-full aspect-[1] border-b-2 border-indigo-600" />
          <p className="font-bold text-2xl text-indigo-600">Loading...</p>
        </div>
      }
    >
      <OTPPage />
    </Suspense>
  );
};
// export default OTPPage;
export default OTPPageWrapper;
