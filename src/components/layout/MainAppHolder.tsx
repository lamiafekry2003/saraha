"use client";

// nextjs
import { usePathname } from "next/navigation";

// react
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainAppHolder = ({ children }: Props) => {
  const mainElRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const main = mainElRef.current;

    if (main) {
      main.classList.toggle("container", pathname !== "/");
    }
  }, [pathname]);

  useEffect(() => {
    const header = document.getElementById("app-header");
    const main = mainElRef.current;
    const GAP = pathname === "/" ? 0 : 20;

    if (header && main) {
      const observer = new ResizeObserver(() => {
        main.style.paddingTop = `${header.offsetHeight + GAP}px`;
      });

      observer.observe(header);

      return () => {
        observer.unobserve(header);
      };
    }
  }, [pathname]);

  return (
    <main ref={mainElRef} className="container flex flex-col flex-1 mb-8">
      {children}
    </main>
  );
};
export default MainAppHolder;
