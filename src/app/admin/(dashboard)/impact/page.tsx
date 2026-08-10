"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { Pencil, Trash2, X, Check, Plus } from "lucide-react";
import { IMPACT_CATEGORIES, type ImpactCategoryKey } from "@/lib/data/impact";
import { cn } from "@/lib/utils";

type Record = {
  id: number;
  category: ImpactCategoryKey;
  recordDate: string;
  count: number;
};

const LIMIT = 20;

function categoryLabel(key: string) {
  return IMPACT_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const inputClass =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary";

export default function ImpactRecordsPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, startTransition] = useTransition();

  const [filterCategory, setFilterCategory] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const [newRecord, setNewRecord] = useState<{ category: ImpactCategoryKey; recordDate: string; count: string }>({
    category: IMPACT_CATEGORIES[0].key,
    recordDate: todayISO(),
    count: "",
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ category: "", recordDate: "", count: "" });
  const [rowError, setRowError] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (filterCategory) params.set("category", filterCategory);
    if (filterFrom) params.set("from", filterFrom);
    if (filterTo) params.set("to", filterTo);
    params.set("limit", String(LIMIT));
    params.set("offset", String(offset));
    return params.toString();
  }, [filterCategory, filterFrom, filterTo, offset]);

  const load = useCallback(() => {
    startTransition(async () => {
      const res = await fetch(`/api/admin/impact-records?${query}`);
      const data = await res.json();
      setRecords(data.records ?? []);
      setTotal(data.total ?? 0);
    });
  }, [query]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    const count = Number(newRecord.count);
    if (!Number.isFinite(count) || count < 0 || !Number.isInteger(count)) {
      setAddError("Count must be a non-negative whole number.");
      return;
    }
    setAdding(true);
    const res = await fetch("/api/admin/impact-records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newRecord.category, recordDate: newRecord.recordDate, count }),
    });
    setAdding(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setAddError(data?.error ?? "Could not add record.");
      return;
    }
    setNewRecord({ category: IMPACT_CATEGORIES[0].key, recordDate: todayISO(), count: "" });
    setOffset(0);
    load();
  }

  function startEdit(r: Record) {
    setEditingId(r.id);
    setRowError("");
    setEditForm({ category: r.category, recordDate: r.recordDate, count: String(r.count) });
  }

  async function saveEdit(id: number) {
    setRowError("");
    const count = Number(editForm.count);
    if (!Number.isFinite(count) || count < 0 || !Number.isInteger(count)) {
      setRowError("Count must be a non-negative whole number.");
      return;
    }
    const res = await fetch(`/api/admin/impact-records/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: editForm.category, recordDate: editForm.recordDate, count }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setRowError(data?.error ?? "Could not update record.");
      return;
    }
    setEditingId(null);
    load();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/impact-records/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Impact Records</h1>
          <p className="mt-1 text-sm text-text-muted">
            These records power the &ldquo;Our Impact&rdquo; section and its Yearly / Last 5 Years / Custom Range filters on the homepage.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleAdd}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-5"
      >
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
          Category
          <select
            value={newRecord.category}
            onChange={(e) => setNewRecord((s) => ({ ...s, category: e.target.value as ImpactCategoryKey }))}
            className={inputClass}
          >
            {IMPACT_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
          Date
          <input
            type="date"
            required
            max={todayISO()}
            value={newRecord.recordDate}
            onChange={(e) => setNewRecord((s) => ({ ...s, recordDate: e.target.value }))}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
          Count
          <input
            type="number"
            min={0}
            step={1}
            required
            placeholder="e.g. 240"
            value={newRecord.count}
            onChange={(e) => setNewRecord((s) => ({ ...s, count: e.target.value }))}
            className={cn(inputClass, "w-32")}
          />
        </label>
        <button
          type="submit"
          disabled={adding}
          className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> {adding ? "Adding…" : "Add Record"}
        </button>
        {addError && <p className="w-full text-sm text-primary">{addError}</p>}
      </form>

      <div className="mt-8 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
          Category
          <select
            value={filterCategory}
            onChange={(e) => {
              setOffset(0);
              setFilterCategory(e.target.value);
            }}
            className={inputClass}
          >
            <option value="">All categories</option>
            {IMPACT_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
          From
          <input
            type="date"
            value={filterFrom}
            onChange={(e) => {
              setOffset(0);
              setFilterFrom(e.target.value);
            }}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
          To
          <input
            type="date"
            value={filterTo}
            onChange={(e) => {
              setOffset(0);
              setFilterTo(e.target.value);
            }}
            className={inputClass}
          />
        </label>
        {(filterCategory || filterFrom || filterTo) && (
          <button
            onClick={() => {
              setFilterCategory("");
              setFilterFrom("");
              setFilterTo("");
              setOffset(0);
            }}
            className="text-sm font-medium text-text-muted hover:text-primary"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Count</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => {
              const isEditing = editingId === r.id;
              return (
                <tr key={r.id} className="border-b border-border last:border-0">
                  {isEditing ? (
                    <>
                      <td className="px-5 py-2.5">
                        <input
                          type="date"
                          max={todayISO()}
                          value={editForm.recordDate}
                          onChange={(e) => setEditForm((s) => ({ ...s, recordDate: e.target.value }))}
                          className={inputClass}
                        />
                      </td>
                      <td className="px-5 py-2.5">
                        <select
                          value={editForm.category}
                          onChange={(e) => setEditForm((s) => ({ ...s, category: e.target.value }))}
                          className={inputClass}
                        >
                          {IMPACT_CATEGORIES.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-2.5">
                        <input
                          type="number"
                          min={0}
                          step={1}
                          value={editForm.count}
                          onChange={(e) => setEditForm((s) => ({ ...s, count: e.target.value }))}
                          className={cn(inputClass, "w-28")}
                        />
                      </td>
                      <td className="px-5 py-2.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => saveEdit(r.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-deep"
                            aria-label="Save"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted hover:text-text"
                            aria-label="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-3 text-text">{r.recordDate}</td>
                      <td className="px-5 py-3 text-text">{categoryLabel(r.category)}</td>
                      <td className="px-5 py-3 font-medium text-text">{r.count.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(r)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                            aria-label="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
            {records.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-sm text-text-muted">
                  No records match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {rowError && <p className="mt-2 text-sm text-primary">{rowError}</p>}

      <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
        <span>
          {total === 0 ? "0" : `${offset + 1}–${Math.min(offset + LIMIT, total)}`} of {total}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setOffset((o) => Math.max(o - LIMIT, 0))}
            disabled={offset === 0}
            className="rounded-full border border-border px-4 py-1.5 font-medium text-text disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => setOffset((o) => (o + LIMIT < total ? o + LIMIT : o))}
            disabled={offset + LIMIT >= total}
            className="rounded-full border border-border px-4 py-1.5 font-medium text-text disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
