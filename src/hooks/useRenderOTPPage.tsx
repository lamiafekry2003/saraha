// nextjs
import { usePathname, useRouter } from "next/navigation";

// react
import { useEffect, useState } from "react";

// utils
import { checkAccess, disAllowAccess } from "@/lib/allowAccessOnOPTPage";

const useRenderOTPPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!checkAccess()) {
      router.replace("/");
      setRender(false);
    } else setRender(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pathname !== "/auth/otp") disAllowAccess();
  }, [pathname]);

  return render;
};

export default useRenderOTPPage;
