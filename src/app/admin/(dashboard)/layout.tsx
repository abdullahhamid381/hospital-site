import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAuthorizedAdmin } from "@/lib/admin";
import { SITE } from "@/lib/data/site";
import { SignOutButton } from "../sign-out-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) redirect("/admin/sign-in");

  return (
    <div className="min-h-screen bg-bg-secondary">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-300 items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image src="/images/logo.png" alt={SITE.name} width={28} height={28} className="h-7 w-7 object-contain" />
              <span className="font-display text-sm font-bold text-text">{SITE.shortName} Admin</span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link
                href="/admin/impact"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
              >
                Impact Records
              </Link>
              <Link
                href="/admin/about"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
              >
                About Page
              </Link>
              <Link
                href="/admin/services"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
              >
                Services
              </Link>
              <Link
                href="/admin/staff"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
              >
                Faculty
              </Link>
              <Link
                href="/admin/admins"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
              >
                Admins
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-text-muted sm:inline">{admin.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-300 px-6 py-10">{children}</main>
    </div>
  );
}
