"use client";

// redux
import useSelector from "@/hooks/redux/useSelector";

export default function Home() {
  const { isPending } = useSelector((state) => state.auth);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full size-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <h1> Hello World</h1>;
}
