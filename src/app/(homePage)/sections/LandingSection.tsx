// nextjs
import Link from "next/link";

// icons
import { ArrowRight, CheckCircle } from "lucide-react";

// components
// shadcn
import { Button } from "@/components/ui/button";

// redux
import useSelector from "@/hooks/redux/useSelector";

const LandingSection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("/landing-section-img.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 opacity-90" />

      <div className="container relative mx-auto px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-indigo-600 sm:text-6xl">
            Share Your Truth
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-transparent">
              Without Fear
            </span>
          </h1>

          <p className="mb-10 text-lg text-gray-800 sm:text-xl">
            Receive honest feedback and messages from friends, colleagues, and
            anyone who knows your link. 100% anonymous, 100% real.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href={user ? "/dashboard" : "/auth/login"}>
                Start Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2 bg-indigo-900 p-2 rounded-md">
              <CheckCircle className="size-5" />
              <span className="text-sm">100% Anonymous</span>
            </div>
            <div className="flex items-center gap-2 bg-indigo-900 p-2 rounded-md">
              <CheckCircle className="size-5" />
              <span className="text-sm">Fully Encrypted</span>
            </div>
            <div className="flex items-center gap-2 bg-indigo-900 p-2 rounded-md">
              <CheckCircle className="size-5" />
              <span className="text-sm">No Registration Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LandingSection;
