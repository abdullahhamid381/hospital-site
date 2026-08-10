import Image from "next/image";
import { SITE } from "@/lib/data/site";

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-secondary px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <Image src="/images/logo.png" alt={SITE.name} width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="font-display text-base font-bold text-text">{SITE.shortName} Admin</span>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-(--shadow-soft)">{children}</div>
      </div>
    </div>
  );
}
