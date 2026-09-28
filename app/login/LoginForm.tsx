"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo =
    searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (signInError) {
      setError(
        signInError.message ||
          "Unable to sign in. Please check your email and password."
      );
      setLoading(false);
      return;
    }

    router.replace(redirectTo);
    router.refresh();
  }

  return (
    <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
          ACE Global Group
        </p>

        <h1 className="text-3xl font-bold text-slate-900">
          Admin Login
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to access the ACE administration dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}