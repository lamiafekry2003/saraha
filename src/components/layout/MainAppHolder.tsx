"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainAppHolder = ({ children }: Props) => {
  const mainElRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = document.getElementById("app-header");
    const main = mainElRef.current;

    if (header && main) {
      const observer = new ResizeObserver(() => {
        main.style.paddingTop = `${header.offsetHeight + 20}px`;
      });

      observer.observe(header);

      return () => {
        observer.unobserve(header);
      };
    }
  }, []);

  return (
    <main ref={mainElRef} className="container flex flex-col flex-1 mb-8">
      {children}
    </main>
  );
};
export default MainAppHolder;
