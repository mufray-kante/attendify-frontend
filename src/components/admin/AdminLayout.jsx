import React from "react";
import AdminPanel from "./AdminPanel";
import Logo from "../Logo";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <Logo />
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </header>
      <main className="flex-grow p-6">
        <AdminPanel />
      </main>
      <footer className="bg-white shadow-inner p-4 text-center text-gray-600 text-sm">
         {new Date().getFullYear()} Attendify. All rights reserved. | 
        <a href="/privacy" className="text-blue-500 underline">Privacy</a> | 
        <a href="/terms" className="text-blue-500 underline">Terms</a> | Cookies are used to improve your experience.
      </footer>
    </div>
  );
};

export default AdminLayout;
