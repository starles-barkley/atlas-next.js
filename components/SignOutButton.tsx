"use client";

import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import { handleSignOut } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form action={handleSignOut}>
      <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">
        Sign Out
      </button>
    </form>
  );
}