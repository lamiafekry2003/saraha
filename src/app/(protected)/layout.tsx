"use client";

// nextjs
import { usePathname, useRouter } from "next/navigation";

// react
import { useEffect, type ReactNode } from "react";

// redux
import useSelector from "@/hooks/redux/useSelector";

type Props = {
  children: ReactNode;
};

export default function Authlayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const authRouts = ["/auth/login", "/auth/register", "/auth/otp"];

    if (authRouts.includes(pathname)) {
      if (user) router.push("/");
    } else {
      if (!user) router.push("/auth/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user]);

  return children;
}
