const howItWorksSteps = [
  {
    title: "Sign Up",
    description:
      "Create your account using email or Google. Takes less than 30 seconds.",
  },
  {
    title: "Share Your Link",
    description:
      "Get your unique anonymous link and share it on social media, with friends, or anywhere.",
  },
  {
    title: "Receive Messages",
    description:
      "Start receiving honest, anonymous messages from people who know you.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-700 sm:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in three simple steps
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorksSteps.map(({ description, title }, i) => (
              <div key={title} className="relative text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
                    {i + 1}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-indigo-700">
                  {title}
                </h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;
