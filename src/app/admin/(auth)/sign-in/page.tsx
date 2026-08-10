"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInAction, type ActionState } from "../../actions";

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(signInAction, null);

  return (
    <>
      <h1 className="font-display text-xl font-bold text-text">Admin Sign In</h1>
      <p className="mt-1.5 text-sm text-text-muted">Access the hospital records dashboard.</p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-text">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="rounded-lg border border-border bg-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-text">Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="rounded-lg border border-border bg-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
          />
        </label>

        {state?.error && <p className="text-sm text-primary">{state.error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
        >
          {isPending ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-text-muted">
        Authorized email but no account yet?{" "}
        <Link href="/admin/sign-up" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </>
  );
}
