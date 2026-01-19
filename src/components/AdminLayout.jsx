// src/components/AdminLayout.jsx
import React, { useState } from "react";
import AddLecturer from "./admin/AddLecturer";
import AddStudent from "./admin/AddStudent";
import CreateCourse from "./admin/CreateCourse";
import EnrollStudent from "./admin/EnrollStudent";
import Logo from "../assets/attendify-logo.png";

const AdminLayout = () => {
    const [activeTab, setActiveTab] = useState("lecturer");

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="flex items-center mb-6">
                <img src={Logo} alt="Attendify" className="h-12 mr-3" />
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </header>

            <nav className="mb-6">
                {["lecturer", "student", "course", "enroll"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`mr-2 px-4 py-2 rounded ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        {tab === "lecturer"
                            ? "Add Lecturer"
                            : tab === "student"
                                ? "Add Student"
                                : tab === "course"
                                    ? "Create Course"
                                    : "Enroll Student"}
                    </button>
                ))}
            </nav>

            <main className="bg-white p-6 rounded shadow">
                {activeTab === "lecturer" && <AddLecturer />}
                {activeTab === "student" && <AddStudent />}
                {activeTab === "course" && <CreateCourse />}
                {activeTab === "enroll" && <EnrollStudent />}
            </main>

            <footer className="mt-8 text-center text-gray-500 text-sm">
                © 2026 Attendify. <a href="/privacy" className="underline">Privacy</a> •{" "}
                <a href="/cookies" className="underline">Cookies</a> •{" "}
                <a href="/terms" className="underline">Terms</a>
            </footer>
        </div>
    );
};

export default AdminLayout;
