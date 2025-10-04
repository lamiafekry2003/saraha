import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// providers
import { Providers } from "@/components/providers";

// components
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import MainAppHolder from "@/components/layout/MainAppHolder";

// layouts
import InitTokenCheckLayout from "@/layouts/InitTokenCheckLayout";

// utils
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saraha App",
  description:
    "Saraha App are a messages application for telling the truth without know the sender information.",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased`}
      >
        <Toaster richColors duration={6000} />
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <InitTokenCheckLayout>
            <Header />
            <MainAppHolder>{children}</MainAppHolder>
            <Footer />
          </InitTokenCheckLayout>
        </Providers>
      </body>
    </html>
  );
}
