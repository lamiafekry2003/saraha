// nextjs
import Link from "next/link";
import Image from "next/image";

// components
// shadcn
import { Button } from "@/components/ui/button";

// icons
import { House } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center flex-col gap-4 justify-center">
      <Image
        src="/illustrations/404.svg"
        alt="404 illustration"
        width={300}
        height={300}
        className="object-contain aspect-[1] max-w-full"
        priority
      />

      <h1 className="text-center text-indigo-700 text-2xl font-bold">
        This Page Not Found
      </h1>

      <Button asChild className="flex">
        <Link href="/">
          <House />
          Go To Home
        </Link>
      </Button>
    </div>
  );
}
