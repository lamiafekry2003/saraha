// nextjs
import Link from "next/link";
import { usePathname } from "next/navigation";

// components
// shadcn
import { Button } from "@/components/ui/button";

// types
import type { DecodedToken } from "@/store/slices/authSlice";

type Props = {
  user?: DecodedToken;
  isPending: boolean;
};

const LoginAndRegisterBtns = ({ isPending, user }: Props) => {
  const pathname = usePathname();

  if (user || isPending) return;

  return (
    <>
      {pathname !== "/auth/login" && (
        <Button variant="outline">
          <Link href="/auth/login">Log In</Link>
        </Button>
      )}

      {pathname !== "/auth/register" && (
        <Button>
          <Link href="/auth/register">Register</Link>
        </Button>
      )}
    </>
  );
};
export default LoginAndRegisterBtns;
