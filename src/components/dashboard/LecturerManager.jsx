"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";

const emptyForm = {
  name: "",
  position: "",
  image: "",
  qualifications: "",
  specialization: "",
  contact: "",
  bio: "",
};

export default function LecturerManager() {
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const res = await fetch("/api/lecturers");
    const data = await res.json();
    if (res.ok) setLecturers(data.lecturers);
  }

  useEffect(() => {
    fetch("/api/lecturers")
      .then((r) => r.json())
      .then((d) => {
        if (d.lecturers) setLecturers(d.lecturers);
      })
      .catch(() => {});
  }, []);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function startEdit(lec) {
    setEditingId(lec._id);
    setForm({
      name: lec.name || "",
      position: lec.position || "",
      image: lec.image || "",
      qualifications: lec.qualifications || "",
      specialization: lec.specialization || "",
      contact: lec.contact || "",
      bio: lec.bio || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(
        editingId ? `/api/lecturers/${editingId}` : "/api/lecturers",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      cancelEdit();
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this lecturer?")) return;
    const res = await fetch(`/api/lecturers/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-semibold mb-3">
          {editingId ? "Edit lecturer" : "Add a lecturer"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="name" required placeholder="Full name" value={form.name} onChange={update} className={inputClass} />
          <input name="position" placeholder="Position (e.g. Professor)" value={form.position} onChange={update} className={inputClass} />
          <input name="qualifications" placeholder="Qualifications" value={form.qualifications} onChange={update} className={inputClass} />
          <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={update} className={inputClass} />
          <input name="contact" placeholder="Contact (email)" value={form.contact} onChange={update} className={inputClass} />
          <input name="image" placeholder="Photo URL (optional)" value={form.image} onChange={update} className={inputClass} />
          <textarea name="bio" placeholder="Biography" rows={2} value={form.bio} onChange={update} className={`${inputClass} sm:col-span-2`} />
          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : editingId ? "Update lecturer" : "Add lecturer"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
        {error && (
          <p className="mt-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
            {error}
          </p>
        )}
      </Card>

      <div>
        <h2 className="font-semibold mb-3">Lecturers</h2>
        {lecturers.length === 0 ? (
          <p className="text-gray-500 text-sm">No lecturers added yet.</p>
        ) : (
          <div className="space-y-2">
            {lecturers.map((lec) => (
              <Card key={lec._id} className="flex justify-between items-center gap-4">
                <div>
                  <p className="font-medium">{lec.name}</p>
                  <p className="text-sm text-gray-500">{lec.position || "—"}</p>
                </div>
                <div className="flex gap-3 text-sm shrink-0">
                  <button onClick={() => startEdit(lec)} className="text-primary hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(lec._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
