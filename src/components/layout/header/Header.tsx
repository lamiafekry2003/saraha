"use client";

// nextjs
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// react
import { useEffect, useRef } from "react";

// components
import Spinner from "../../shared/Spinner";
import LogoutBtn from "./LogoutBtn";
import LoginAndRegisterBtns from "./LoginAndRegisterBtns";

// shadcn
import { Button } from "../../ui/button";

// redux
import useSelector from "@/hooks/redux/useSelector";

// icons
import { User } from "lucide-react";

const Header = () => {
  const { user, isPending } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (header && pathname === "/") {
      const observer = new ResizeObserver(() => {
        const newValue = `${header.offsetHeight - 20}px`;
        const oldValue = document.documentElement.style.scrollPaddingTop;

        if (newValue !== oldValue) {
          document.documentElement.style.scrollPaddingTop = newValue;
        }
      });

      observer.observe(header);

      return () => {
        observer.disconnect();
      };
    }
  }, [pathname]);

  return (
    <header
      id="app-header"
      className="shadow fixed top-0 left-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg"
      ref={headerRef}
    >
      <div className="container flex-wrap flex items-center gap-4 justify-between py-4">
        <Link href="/">
          <Image
            src="/logos/logoWithText.svg"
            alt="logo"
            width={80}
            height={80}
            className="aspect-[1] object-contain"
            priority
          />
        </Link>

        <nav className="flex items-center flex-wrap gap-4">
          {pathname === "/" && (
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <a href="#how-it-works">How It Works</a>
            </Button>
          )}

          {isPending && (
            <div className="flex flex-wrap items-center justify-center gap-2 font-bold text-indigo-500 select-none">
              <Spinner className="!border-indigo-500 !border-b-transparent" />
              Loading...
            </div>
          )}

          <LoginAndRegisterBtns user={user?.decoded} isPending={isPending} />

          {user && !isPending && (
            <>
              {pathname !== "/dashboard" && (
                <Button
                  asChild
                  className="flex items-center justify-center gap-2 flex-wrap"
                  style={{ height: "unset" }}
                >
                  <Link href="/dashboard">
                    <User />
                    Profile
                  </Link>
                </Button>
              )}

              <LogoutBtn />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
