// src/App.jsx
import React, { useState } from "react";
import { QRCodeCanvas as QRCode } from "qrcode.react"; // Fixed import for Vite

export default function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [pin, setPin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dummy login state
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      e.target.email.value === "joneskatarinawitt@gmail.com" &&
      e.target.password.value === "9843"
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  // Dummy QR session generation
  const handleGenerateQR = () => {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    setSessionToken(token);
    setPin(token);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg
                width="42"
                height="42"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="22" fill="#2563EB" />
                <path
                  d="M28 52L44 68L72 36"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="72" cy="28" r="6" fill="white" />
              </svg>
              <span className="text-2xl font-semibold">Attendify</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        {!isLoggedIn ? (
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-lg p-8 rounded-xl max-w-md mx-auto flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue="joneskatarinawitt@gmail.com"
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              defaultValue="9843"
              className="border p-2 rounded"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-8">
            <h2 className="text-xl font-bold">Welcome, Raymond Mwenda</h2>
            <p>Phone: +25494712825</p>

            {/* QR Code Generation */}
            <div className="bg-white shadow-lg p-6 rounded-xl flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold">Generate Attendance QR Code</h3>
              <button
                onClick={handleGenerateQR}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Generate QR
              </button>
              {sessionToken && (
                <div className="flex flex-col items-center">
                  <QRCode value={sessionToken} size={128} />
                  <p className="mt-2 font-semibold">PIN: {pin}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Attendify</h3>
            <p className="text-sm">
              A professional attendance management solution built for scale,
              reliability, and real-world use.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <p className="text-sm">Email: joneskatarinawitt@gmail.com</p>
            <p className="text-sm">Phone: +25494712825</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 border-t border-gray-800 py-4">
          © {new Date().getFullYear()} Attendify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
