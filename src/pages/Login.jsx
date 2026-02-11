import React, { useState } from "react";
import { loginAndGenerateQR } from "../utils/loginQR";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error | warning
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setQrUrl("");

    try {
      const result = await loginAndGenerateQR(email, password);

      if (result.success) {
        setMessage("Login successful. QR code generated.");
        setMessageType("success");
        setQrUrl(result.qrCodeUrl);

        // Redirect based on role
        const userRole = result.user?.role; // Assuming loginQR returns user role
        if (userRole === "admin") window.location.href = "/admin-dashboard";
        else if (userRole === "lecturer") window.location.href = "/lecturer-dashboard";
        else if (userRole === "student") window.location.href = "/student-dashboard";
      } else {
        setMessage(result.message || "Login failed");
        setMessageType(result.type || "error");
      }
    } catch (err) {
      setMessage("Unable to connect to server. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-yellow-500 text-white text-2xl font-bold rounded-xl flex items-center justify-center mb-2">
            A
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Attendify</h1>
          <p className="text-gray-600 mt-2 text-sm">Sign in to your account</p>
        </div>

        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded-lg text-center ${messageType === "success"
                ? "bg-green-100 text-green-800"
                : messageType === "warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {qrUrl && (
          <div className="mt-6 flex justify-center">
            <img src={qrUrl} alt="User QR Code" className="w-40 h-40 rounded-xl shadow-lg" />
          </div>
        )}

        <footer className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Attendify. All rights reserved.
        </footer>
      </div>
    </div>
  );
}