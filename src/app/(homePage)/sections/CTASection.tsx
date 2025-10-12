// nextjs
import Link from "next/link";

// components
// shadcn
import { Button } from "@/components/ui/button";

// icons
import { ArrowRight } from "lucide-react";

// redux
import useSelector from "@/hooks/redux/useSelector";

const CTASection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="bg-[var(--gradient-hero)] py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-03xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-indigo-700 sm:text-4xl">
            Ready to Hear the Truth?
          </h2>

          <p className="mb-10 text-lg">
            Join thousands of users who believe in honest, anonymous feedback.
            Create your link today and start your journey to authentic
            communication.
          </p>

          <Button asChild size="lg">
            <Link href={user ? "/dashboard" : "/auth/register"}>
              {user && <ArrowRight className="ml-2 h-5 w-5" />}
              {user ? "Visit Your Profile" : "Create Your Free Account"}
              {!user && <ArrowRight className="ml-2 h-5 w-5" />}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default CTASection;
