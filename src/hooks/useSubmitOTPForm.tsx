// nextjs
import { useRouter, useSearchParams } from "next/navigation";

// react
import { useState, type FormEvent, type RefObject } from "react";

// redux
import useDispatch from "./redux/useDispatch";
// actions
import { confirmEmail } from "@/store/slices/authSlice";

// utils
import { toast } from "sonner";

type Props = {
  OTPInputRef: RefObject<HTMLInputElement | null>;
};

const useSubmitOTPForm = ({ OTPInputRef }: Props) => {
  const dispatch = useDispatch();
  const email = useSearchParams().get("email") || "";
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errorMsg =
      "can't confirm your email at the momment, try again later.";

    const otp = OTPInputRef.current?.value || "";

    if (!otp.length) {
      return setError("OTP code must be provided");
    }
    if (otp.length !== 6) {
      return setError("OTP code must be 6 characters");
    }
    if (otp.split("").some((n) => isNaN(+n))) {
      return setError("Invalid OTP code !");
    }

    setLoading(true);
    try {
      const result = await dispatch(confirmEmail({ email, otp }));

      if (confirmEmail.fulfilled.match(result)) {
        router.push("/auth/login");
        toast.success("Your email confirmed successfully");
      } else {
        setError(
          typeof result.payload !== "string" ? errorMsg : result.payload
        );
      }
    } catch {
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    error,
    loading,
    isNoEmail: !email ? "NO_EMAIL_FOUNDED" : undefined,
  };
};

export default useSubmitOTPForm;
