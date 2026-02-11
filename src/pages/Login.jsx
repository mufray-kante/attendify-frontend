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

        // Example: redirect based on role
        const role = result.user?.role;
        if (role === "ADMIN") window.location.href = "/admin-dashboard";
        else if (role === "LECTURER") window.location.href = "/lecturer-dashboard";
        else window.location.href = "/student-dashboard";
      } else {
        setMessage(result.message || "Login failed");
        setMessageType(result.type || "error");
      }
    } catch {
      setMessage("Unable to connect to server. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const getMessageColor = () => {
    if (messageType === "success") return "text-green-600";
    if (messageType === "warning") return "text-yellow-500";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h1>

        {message && (
          <div className={`${getMessageColor()} mb-4 text-center font-medium`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {qrUrl && (
          <div className="mt-6 text-center">
            <img src={qrUrl} alt="User QR code" className="mx-auto w-40 h-40" />
          </div>
        )}
      </div>
    </div>
  );
}