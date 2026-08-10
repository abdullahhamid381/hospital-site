import { auth } from "@/lib/auth/server";
import { pool } from "@/lib/db";

export type AdminUser = {
  id: string;
  email: string;
  name?: string | null;
};

/**
 * Authentication (Neon Auth session) only proves who signed in.
 * Authorization for /admin is a separate allow-list, since anyone can
 * sign up for a Neon Auth account.
 */
export async function getAuthorizedAdmin(): Promise<AdminUser | null> {
  const { data: session } = await auth.getSession();
  const email = session?.user?.email;
  if (!email) return null;

  const { rows } = await pool.query("SELECT 1 FROM admin_emails WHERE email = $1", [email.toLowerCase()]);
  if (rows.length === 0) return null;

  return { id: session.user.id, email, name: session.user.name };
}

export async function isEmailAllowed(email: string): Promise<boolean> {
  const { rows } = await pool.query("SELECT 1 FROM admin_emails WHERE email = $1", [email.toLowerCase()]);
  return rows.length > 0;
}
