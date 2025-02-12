"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoggedInUser() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center space-x-3 p-4 border rounded-lg">
      <Image
        src={session.user.image || "/default-avatar.png"}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="text-lg font-medium">{session.user.name}</span>
    </div>
  );
}
