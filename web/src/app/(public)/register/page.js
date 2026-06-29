"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Select from "@/components/Select";

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
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-6 py-16 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Create your account</h1>

      {error && (
        <p className="mb-4 rounded bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={update}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={update}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
              <input
                name="matricNumber"
                value={form.matricNumber}
                onChange={update}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
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
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
  );
}
