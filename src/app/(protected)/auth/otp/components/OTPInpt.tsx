// react
import type { Ref } from "react";

// components
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type Props = {
  ref: Ref<HTMLInputElement>;
};

const OTP_LENGTH = 6;

const OTPInpt = ({ ref }: Props) => {
  return (
    <InputOTP ref={ref} pattern={REGEXP_ONLY_DIGITS} maxLength={6}>
      <InputOTPGroup>
        {Array.from({ length: OTP_LENGTH }).map((_, i) => (
          <InputOTPSlot
            className="text-indigo-500 font-bold !border-indigo-500 border-2 m-1.5 size-12 !rounded-md"
            index={i}
            key={i}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};
export default OTPInpt;
