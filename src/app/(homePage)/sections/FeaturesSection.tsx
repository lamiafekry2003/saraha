// icons
import {
  Heart,
  Lock,
  MessageCircle,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

// components
// shadcn
import { Card } from "@/components/ui/card";

const featuresList = [
  {
    Icon: Shield,
    title: "100% Anonymous",
    description:
      "Senders remain completely anonymous. No names, no emails, no traces. Pure honesty.",
  },
  {
    Icon: Lock,
    title: "Secure & Private",
    description:
      "End-to-end encryption ensures your messages stay private and protected at all times.",
  },
  {
    Icon: Heart,
    title: "Build Trust",
    description:
      "Honest feedback strengthens relationships and helps you grow personally and professionally.",
  },
  {
    Icon: MessageCircle,
    title: "Easy to Use",
    description:
      "Get your unique link in seconds. Share it anywhere and start receiving honest messages.",
  },
  {
    Icon: Users,
    title: "Growing Community",
    description:
      "Join thousands of users who believe in honest, anonymous communication.",
  },
  {
    Icon: Sparkles,
    title: "Free Forever",
    description:
      "Create your link and receive unlimited messages. No hidden fees, ever.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-700 sm:text-4xl">
            Why Choose TruthBox?
          </h2>
          <p className="text-lg text-muted-foreground">
            The safest way to receive honest feedback and strengthen your
            relationships
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuresList.map(({ Icon, description, title }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border-border/50 p-6 transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-indigo-700" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <Icon className="size-6 text-indigo-700" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-indigo-700">
                  {title}
                </h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
