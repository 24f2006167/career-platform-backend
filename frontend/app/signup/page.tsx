"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {

    router.replace("/dashboard");

  }

}, [router]);
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/signup",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        formData.role
      );

      alert("Signup successful!");
      localStorage.setItem("isNewUser", "true");

      router.push("/dashboard");

    } catch (error: any) {

      console.log(error);

      alert(
        error?.response?.data?.detail ||
        "Signup failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">

      {/* GLOW EFFECT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-500/20 blur-[150px] rounded-full" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <h1 className="text-4xl font-black">
            Create Account
          </h1>

          <p className="mt-3 text-gray-400">
            Start your AI-powered interview preparation.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSignup}
          className="space-y-6"
        >

          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
            >
              <option value="candidate">
                candidate
              </option>

              <option value="recruiter">
                recruiter
              </option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white py-4 font-bold text-black transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-gray-400">
          Already have an account?{" "}

          <Link
            href="/login"
            className="text-pink-400 hover:text-pink-300"
          >
            Login
          </Link>

        </p>

      </div>

    </main>
  );
}