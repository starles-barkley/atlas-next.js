"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Sign in with GitHub
    </button>
  );
}
