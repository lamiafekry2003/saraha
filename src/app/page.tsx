"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isPending } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Saraha</h1>

        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h2 className="text-lg font-medium text-green-800">
                Login Successful!
              </h2>
              <p className="text-green-600">
                Your backend is working correctly.
              </p>
            </div>

            <div className="p-4 bg-gray-50 border rounded-md">
              <h3 className="font-medium text-gray-700 mb-2">User Data:</h3>
              <pre className="text-xs text-gray-600 text-left overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h2 className="text-lg font-medium text-yellow-800">
                Not Logged In
              </h2>
              <p className="text-yellow-600">
                Please log in to test your backend.
              </p>
            </div>

            <button
              onClick={() => router.push("/auth/login")}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
