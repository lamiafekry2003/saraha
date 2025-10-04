"use client";

// redux
import useSelector from "@/hooks/redux/useSelector";

export default function Home() {
  const { isPending } = useSelector((state) => state.auth);

  if (isPending) {
    return (
      <div className="flex-1 flex-col gap-4 flex items-center justify-center">
        <div className="max-[280px]:size-[100px] animate-spin rounded-full size-44 max-w-full aspect-[1] border-b-2 border-indigo-600" />
        <p className="font-bold text-2xl text-indigo-600">Loading...</p>
      </div>
    );
  }
  return <h1> Hello world</h1>;
}
