import { auth } from "@/lib/auth/server";

export const proxy = auth.middleware({ loginUrl: "/admin/sign-in" });

// Note: /api/admin/* is deliberately not matched here — each route under
// /api/admin already calls getAuthorizedAdmin() itself, and routing POST/PATCH/
// DELETE requests through this proxy triggers a bug in this beta version of
// @neondatabase/auth's middleware that redirects authenticated non-GET
// requests to loginUrl instead of passing them through.
export const config = {
  matcher: ["/admin", "/admin/((?!sign-in|sign-up).*)"],
};
