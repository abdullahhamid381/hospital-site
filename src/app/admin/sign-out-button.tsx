"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);
    await authClient.signOut();
    router.replace("/admin/sign-in");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={pending}
      className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Sign Out"}
    </button>
  );
}
