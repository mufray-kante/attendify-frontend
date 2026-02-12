import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAndGenerateQR } from "../utils/loginQR";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error | warning
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setQrUrl("");

    try {
      const result = await loginAndGenerateQR(form.email, form.password);

      if (result.success) {
        setMessage("Login successful. QR code generated.");
        setMessageType("success");
        setQrUrl(result.qrCodeUrl);

        const role = result.user?.role;

        // Match your backend roles
        if (role === "ADMIN") navigate("/admin-dashboard");
        else if (role === "LECTURER") navigate("/lecturer-dashboard");
        else if (role === "STUDENT") navigate("/student-dashboard");
      } else {
        setMessage(result.message || "Login failed");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Unable to connect to server. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const messageStyles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-yellow-500 text-white text-2xl font-bold rounded-xl flex items-center justify-center mb-3">
            A
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Attendify</h1>
          <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded-lg text-center text-sm font-medium ${messageStyles[messageType]}`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* QR Preview */}
        {qrUrl && (
          <div className="mt-6 flex justify-center">
            <img
              src={qrUrl}
              alt="User QR Code"
              className="w-40 h-40 rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Attendify. All rights reserved.
        </div>

      </div>
    </div>
  );
}