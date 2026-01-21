import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ role }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
      <div className="text-xl font-bold text-blue-600">
        Attendify {role?.charAt(0).toUpperCase() + role?.slice(1)}
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">{user?.fullName}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
