"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction, type ActionState } from "../../actions";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(signUpAction, null);

  return (
    <>
      <h1 className="font-display text-xl font-bold text-text">Create Admin Account</h1>
      <p className="mt-1.5 text-sm text-text-muted">
        Only email addresses an existing admin has authorized can sign up.
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-text">Full Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="rounded-lg border border-border bg-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
          />
        </label>
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
            minLength={8}
            autoComplete="new-password"
            className="rounded-lg border border-border bg-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
          />
        </label>

        {state?.error && <p className="text-sm text-primary">{state.error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
        >
          {isPending ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-text-muted">
        Already have an account?{" "}
        <Link href="/admin/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
