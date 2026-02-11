import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAndGenerateQR } from "../utils/loginQR";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error | warning
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Automatically clear messages & QR after 5 seconds
    if (message || qrUrl) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
        setQrUrl("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, qrUrl]);

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

        // Role-based redirect
        switch (result.role?.toUpperCase()) {
          case "ADMIN":
            navigate("/admin-dashboard");
            break;
          case "LECTURER":
            navigate("/lecturer-dashboard");
            break;
          case "STUDENT":
            navigate("/student-dashboard");
            break;
          default:
            setMessage("Unknown user role");
            setMessageType("error");
        }
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0B2545", // dark blue
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#1E3A5F",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#FFD700" }}>
          University Login
        </h1>

        {message && (
          <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor:
                messageType === "success"
                  ? "#4BB543"
                  : messageType === "warning"
                    ? "#FFD700"
                    : "#FF4C4C",
              color: messageType === "warning" ? "#0B2545" : "white",
              fontWeight: "bold",
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
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#FFD700", // gold
              color: "#0B2545",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = 0.8)}
            onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {qrUrl && (
          <img
            src={qrUrl}
            alt="User QR code"
            style={{
              marginTop: "25px",
              maxWidth: "180px",
              borderRadius: "10px",
              border: "2px solid #FFD700",
            }}
          />
        )}
      </div>
    </div>
  );
}