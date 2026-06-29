"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
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
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome back</h1>

      {error && (
        <p className="mb-4 rounded bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            value={form.password}
            onChange={update}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
