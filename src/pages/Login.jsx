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
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Login</h1>

      {message && (
        <div
          style={{
            marginBottom: "10px",
            color:
              messageType === "success"
                ? "green"
                : messageType === "warning"
                  ? "#b45309"
                  : "red",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px" }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      {qrUrl && (
        <img
          src={qrUrl}
          alt="User QR code"
          style={{ marginTop: "20px", maxWidth: "200px" }}
        />
      )}
    </div>
  );
}
