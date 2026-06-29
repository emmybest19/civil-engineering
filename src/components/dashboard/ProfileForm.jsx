"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50";

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function ProfileForm() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", image: "", position: "" });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const [pw, setPw] = useState({ currentPassword: "", newPassword: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.profile) {
          setProfile(d.profile);
          setForm({
            name: d.profile.name || "",
            phone: d.profile.phone || "",
            image: d.profile.image || "",
            position: d.profile.position || "",
          });
        }
      });
  }, []);

  async function saveProfile(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      setProfile(data.profile);
      setMsg("Profile updated.");
    } catch (e) {
      setMsg(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function savePassword(e) {
    e.preventDefault();
    setPwSaving(true);
    setPwMsg("");
    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pw),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to change password.");
      setPw({ currentPassword: "", newPassword: "" });
      setPwMsg("Password changed.");
    } catch (e) {
      setPwMsg(e.message);
    } finally {
      setPwSaving(false);
    }
  }

  if (!profile) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-semibold mb-4">Account details</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          <Field label="Full name">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
          </Field>
          <Field label="Phone">
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Profile photo URL">
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} placeholder="https://…" />
          </Field>
          {profile.role === "teacher" && (
            <Field label="Position">
              <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className={inputClass} />
            </Field>
          )}

          {/* Read-only, admin-controlled */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Field label="Email">
              <input value={profile.email} disabled className={`${inputClass} bg-gray-50 text-gray-500`} />
            </Field>
            <Field label="Role">
              <input value={profile.role} disabled className={`${inputClass} bg-gray-50 text-gray-500 capitalize`} />
            </Field>
            {profile.role === "student" && (
              <>
                <Field label="Matric number">
                  <input value={profile.matricNumber || "—"} disabled className={`${inputClass} bg-gray-50 text-gray-500`} />
                </Field>
                <Field label="Level">
                  <input value={profile.level || "—"} disabled className={`${inputClass} bg-gray-50 text-gray-500`} />
                </Field>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
            {msg && <span className="text-sm text-gray-600">{msg}</span>}
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="font-semibold mb-4">Change password</h2>
        <form onSubmit={savePassword} className="space-y-4 max-w-sm">
          <Field label="Current password">
            <input type="password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} className={inputClass} required />
          </Field>
          <Field label="New password">
            <input type="password" minLength={6} value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} className={inputClass} required />
          </Field>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={pwSaving}>
              {pwSaving ? "Saving…" : "Change password"}
            </Button>
            {pwMsg && <span className="text-sm text-gray-600">{pwMsg}</span>}
          </div>
        </form>
      </Card>
    </div>
  );
}
