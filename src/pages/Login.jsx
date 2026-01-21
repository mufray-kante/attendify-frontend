// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { api } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("joneskatarinawitt@gmail.com");
  const [password, setPassword] = useState("9843");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate based on role
      const role = res.data.user.role;
      if (role === "admin") navigate("/admin");
      else if (role === "lecturer") navigate("/lecturer");
      else navigate("/student");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 animate-fadeIn">
        {/* Logo & Heading */}
        <div className="flex flex-col items-center mb-8">
          <Logo size={64} />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Attendify
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Secure Attendance Management System
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Raymond Mwenda • +25494712825 <br />
          © {new Date().getFullYear()} Attendify
        </div>
      </div>
    </div>
  );
}
