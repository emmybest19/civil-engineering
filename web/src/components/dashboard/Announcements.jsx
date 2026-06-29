"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Select from "@/components/Select";

function formatDate(d) {
  return new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Announcements({ canManage = false }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", body: "", audience: "all" });
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    try {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load.");
      setItems(data.announcements);
    } catch (e) {
      setError(e.message);
      setItems([]);
    }
  }

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (!ok) throw new Error(d.error || "Failed to load.");
        setItems(d.announcements);
      })
      .catch((e) => {
        setError(e.message);
        setItems([]);
      });
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create.");
      setForm({ title: "", body: "", audience: "all" });
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this announcement?")) return;
    const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div className="space-y-6">
      {canManage && (
        <Card>
          <h2 className="font-semibold mb-3">Post an announcement</h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              placeholder="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <textarea
              placeholder="Write your announcement…"
              required
              rows={3}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <div className="flex items-center gap-3">
              <Select
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
                className="w-44"
              >
                <option value="all">Everyone</option>
                <option value="student">Students only</option>
                <option value="teacher">Teachers only</option>
              </Select>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Posting…" : "Post"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {error && (
        <p className="rounded bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
          {error}
        </p>
      )}

      {items === null ? (
        <p className="text-gray-500 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-sm">No announcements yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <Card key={a._id}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">{a.body}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDate(a.createdAt)}
                    {a.createdBy?.name ? ` · ${a.createdBy.name}` : ""}
                    {a.audience !== "all" ? ` · ${a.audience}s` : ""}
                  </p>
                </div>
                {canManage && (
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="text-sm text-red-600 hover:underline shrink-0"
                  >
                    Delete
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
