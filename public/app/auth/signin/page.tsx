'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Signin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (response?.error) {
      alert("Sign in failed: " + response.error);
    } else {
      alert("Sign in successful");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-100 to-green-200">
      {/* Header */}
      <header className="w-full flex items-center p-4 fixed top-0 left-0 z-50" style={{ backgroundColor: '#294B29' }}>
        <div className="flex items-center">
          <Image src="/logo.png" alt="TaskHunt Logo" width={40} height={40} />
          <h1 className="ml-2 text-white text-2xl font-semibold">TaskHunt</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center pt-20 w-full">
        <div className="bg-green-50 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center text-green-800 mb-6">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-green-100 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-green-100 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-green-600">Don't have an account?</p>
              <a href="/auth/signup" className="text-green-700 hover:text-green-800">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
