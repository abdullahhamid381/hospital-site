"use client";

import { useEffect, useState, useTransition } from "react";
import { Trash2, Plus } from "lucide-react";

type AdminEmail = { email: string; added_at: string };

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminEmail[]>([]);
  const [loading, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  function load() {
    startTransition(async () => {
      const res = await fetch("/api/admin/admins");
      const data = await res.json();
      setAdmins(data.admins ?? []);
    });
  }

  useEffect(load, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAdding(true);
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setAdding(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Could not add admin.");
      return;
    }
    setEmail("");
    load();
  }

  async function handleRemove(target: string) {
    if (!window.confirm(`Remove admin access for ${target}?`)) return;
    setError("");
    const res = await fetch(`/api/admin/admins/${encodeURIComponent(target)}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Could not remove admin.");
      return;
    }
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-text">Admins</h1>
      <p className="mt-1 text-sm text-text-muted">
        Only emails on this list can create an account or sign in to the admin panel.
      </p>

      <form onSubmit={handleAdd} className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-5">
        <label className="flex flex-1 min-w-[220px] flex-col gap-1.5 text-xs font-medium text-text-muted">
          Email to authorize
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@hospital.com"
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary"
          />
        </label>
        <button
          type="submit"
          disabled={adding}
          className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> {adding ? "Adding…" : "Authorize"}
        </button>
        {error && <p className="w-full text-sm text-primary">{error}</p>}
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Authorized</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.email} className="border-b border-border last:border-0">
                <td className="px-5 py-3 text-text">{a.email}</td>
                <td className="px-5 py-3 text-text-muted">{new Date(a.added_at).toLocaleDateString()}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRemove(a.email)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {admins.length === 0 && !loading && (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-sm text-text-muted">
                  No admins yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
