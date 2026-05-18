"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import API from "@/services/api";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // HANDLE INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE LOGIN
  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const params = new URLSearchParams();

      params.append(
        "username",
        formData.email
      );

      params.append(
        "password",
        formData.password
      );

      const response = await API.post(
        "/login",
        params.toString(),
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      // LOGIN FAILED
      if (!response.data.access_token) {

        alert(
          response.data.message ||
          "Login failed"
        );

        return;
      }

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify({
          name:
            response.data.user?.name ||
            "User",
          role:
            response.data.user?.role ||
            "candidate",
        })
      );

      alert("Login successful!");
      localStorage.setItem("isNewUser", "false");

      router.replace("/dashboard");

    } catch (error: any) {

      console.log(error);

      alert(
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/20 blur-[150px] rounded-full" />

      {/* CARD */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <h1 className="text-5xl font-black">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-400">
            Login to continue your preparation journey.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

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
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none focus:border-purple-500"
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
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none focus:border-purple-500"
              required
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white py-4 font-bold text-black transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center text-gray-400">

          <p>
            Don’t have an account?{" "}

            <Link
              href="/signup"
              className="text-purple-400 hover:text-purple-300"
            >
              Signup
            </Link>
          </p>

        </div>

        {/* CREDITS */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">

          <p className="text-sm text-gray-500">
            Built with ❤️ by
          </p>

          <h3 className="mt-2 text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Shitanshu Chaurasiya
          </h3>

          <p className="mt-1 text-xs text-gray-600">
            AI Powered Career Preparation Platform
          </p>

        </div>

      </div>

    </main>
  );
}