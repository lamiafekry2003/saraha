"use client";

// react
import type { ComponentProps } from "react";

// providers
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { store } from "@/store/store";

export function Providers({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <Provider store={store}>{children}</Provider>
    </NextThemesProvider>
  );
}
