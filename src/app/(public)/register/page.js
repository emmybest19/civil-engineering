"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Select from "@/components/Select";
import AuthSidePanel from "@/components/AuthSidePanel";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    matricNumber: "",
    level: "100",
    position: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }
      router.replace("/login?registered=1");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="grid md:grid-cols-2 min-h-[600px] md:min-h-[calc(100vh-8rem)]">
      {/* Form — left */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-6">
            Join the department portal in a few steps.
          </p>

          {error && (
            <p className="mb-4 rounded bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full name</label>
              <input name="name" required value={form.name} onChange={update} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" required value={form.email} onChange={update} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={update}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">I am a</label>
              <Select name="role" value={form.role} onChange={update}>
                <option value="student">Student</option>
                <option value="teacher">Teacher / Lecturer</option>
              </Select>
            </div>

            {form.role === "student" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Matric number</label>
                  <input name="matricNumber" value={form.matricNumber} onChange={update} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Level</label>
                  <Select name="level" value={form.level} onChange={update}>
                    {["100", "200", "300", "400", "500"].map((l) => (
                      <option key={l} value={l}>{l} Level</option>
                    ))}
                  </Select>
                </div>
              </>
            )}

            {form.role === "teacher" && (
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <input
                  name="position"
                  value={form.position}
                  onChange={update}
                  placeholder="e.g. Senior Lecturer"
                  className={inputClass}
                />
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Smart content — right */}
      <AuthSidePanel
        image="/images/skyscraper-construction.jpg"
        heading="Join the department"
        subheading="Create your account to access everything the Civil Engineering portal offers."
        points={[
          "Students, lecturers, and admins — all in one portal",
          "Secure access to results and announcements",
          "Set up your profile in minutes",
          "Free for all department members",
        ]}
      />
    </div>
  );
}
