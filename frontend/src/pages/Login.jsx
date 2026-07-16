import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");

    try {
      await api.post("/auth/login", { email, password });
      navigate("/dashboard");
    } catch (err) {
      console.error("Login compilation error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#282A36] px-4 py-6">
      <div className="w-full max-w-md rounded-xl border border-[#44475A] bg-[#44475A] p-6 shadow-2xl sm:p-8">
        <div className="mb-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-[#F8F8F2] sm:text-3xl">
            Sign in to Omniscient
          </h2>
          <p className="mt-2 text-center text-sm text-[#6272A4]">
            Welcome back
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#8BE9FD]">
              Email Address
            </label>

            <input
              type="email"
              required
              placeholder="admin@omniscient.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-[#6272A4] bg-[#282A36] px-3 py-3 text-base text-[#F8F8F2] placeholder-[#6272A4] transition-colors focus:border-[#BD93F9] focus:outline-none focus:ring-2 focus:ring-[#BD93F9]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#8BE9FD]">
              Password
            </label>

            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-[#6272A4] bg-[#282A36] px-3 py-3 text-base text-[#F8F8F2] placeholder-[#6272A4] transition-colors focus:border-[#BD93F9] focus:outline-none focus:ring-2 focus:ring-[#BD93F9]"
            />
          </div>

          {error && (
            <div className="rounded-md border border-[#FF5555]/40 bg-[#FF5555]/10 p-3">
              <p className="text-sm font-medium text-[#FF5555]">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-[#BD93F9] px-4 py-3 text-sm font-semibold text-[#282A36] transition-all duration-200 hover:bg-[#FF79C6] focus:outline-none focus:ring-2 focus:ring-[#BD93F9] focus:ring-offset-2 focus:ring-offset-[#44475A]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export { Login };