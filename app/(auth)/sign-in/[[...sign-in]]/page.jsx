"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-2">
            Welcome to AI Interview Mocker
          </h1>
          <p className="text-sm text-center text-gray-500 mb-4">
            Sign in to continue your mock interview journey
          </p>
          <SignIn appearance={{ elements: { card: "shadow-none" } }} />
        </div>
      </div>
    </div>
  );
}
