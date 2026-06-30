"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import AuthSidePanel from "@/components/AuthSidePanel";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "1";

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
    <div className="flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to your account to continue.</p>

        {justRegistered && (
          <p className="mb-4 rounded bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2">
            Account created successfully. Please sign in.
          </p>
        )}

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
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="grid md:grid-cols-2 min-h-[600px] md:min-h-[calc(100vh-8rem)]">
      {/* Smart content — left */}
      <AuthSidePanel
        image="/images/modern-building.jpg"
        heading="Welcome back"
        subheading="Sign in to access your dashboard, results, announcements, and the department directory."
        points={[
          "Check your results the moment they're published",
          "Never miss a department announcement",
          "Browse the lecturer directory",
          "Manage your academic profile",
        ]}
      />

      {/* Form — right */}
      <Suspense
        fallback={<div className="flex items-center justify-center p-10 text-gray-500">Loading…</div>}
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
