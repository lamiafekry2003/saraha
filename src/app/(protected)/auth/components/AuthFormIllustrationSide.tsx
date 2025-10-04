// nextjs
import Image from "next/image";

const AuthFormIllustrationSide = () => {
  return (
    <div className="flex-[0.8] max-md:hidden space-y-2 text-center">
      <Image
        src="/illustrations/messages.svg"
        alt="message illustration"
        width={300}
        height={300}
        className="max-w-full object-contain aspect-[1] mx-auto"
        priority
      />
      <p className="font-bold text-indigo-700 text-4xl">
        Share Your Truth Without Fear
      </p>

      <p className="text-indigo-500 font-semibold">
        Receive honest feedback and messages from friends, colleagues, and
        anyone who knows your link. 100% anonymous, 100% real.
      </p>
    </div>
  );
};
export default AuthFormIllustrationSide;
