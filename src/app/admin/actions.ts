"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { isEmailAllowed } from "@/lib/admin";

export type ActionState = { error?: string } | null;

export async function signInAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Email and password are required." };

  const { error } = await auth.signIn.email({ email, password });
  if (error) return { error: error.message || "Invalid email or password." };

  redirect("/admin");
}

export async function signUpAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !name || !password) return { error: "All fields are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const allowed = await isEmailAllowed(email);
  if (!allowed) {
    return { error: "This email is not authorized for admin access. Contact an existing admin." };
  }

  const { error } = await auth.signUp.email({ email, name, password });
  if (error) return { error: error.message || "Could not create account." };

  redirect("/admin");
}

