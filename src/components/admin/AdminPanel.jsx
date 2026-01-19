// src/components/admin/AdminPanel.jsx
import React, { useState } from "react";

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState("lecturer");

    // Form states
    const [lecturerName, setLecturerName] = useState("");
    const [lecturerEmail, setLecturerEmail] = useState("");
    const [lecturerPassword, setLecturerPassword] = useState("");

    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");

    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");

    const [enrollStudentEmail, setEnrollStudentEmail] = useState("");
    const [enrollCourseCode, setEnrollCourseCode] = useState("");

    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token"); // Admin JWT token

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint = "";
        let body = {};

        switch (activeTab) {
            case "lecturer":
                endpoint = "/admin/lecturer";
                body = { name: lecturerName, email: lecturerEmail, password: lecturerPassword };
                break;
            case "student":
                endpoint = "/admin/student";
                body = { name: studentName, email: studentEmail };
                break;
            case "course":
                endpoint = "/admin/course";
                body = { name: courseName, code: courseCode };
                break;
            case "enroll":
                endpoint = "/admin/enroll";
                body = { studentEmail: enrollStudentEmail, courseCode: enrollCourseCode };
                break;
            default:
                return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            setMessage(data.message);

            // Reset form fields
            setLecturerName(""); setLecturerEmail(""); setLecturerPassword("");
            setStudentName(""); setStudentEmail("");
            setCourseName(""); setCourseCode("");
            setEnrollStudentEmail(""); setEnrollCourseCode("");
        } catch (err) {
            setMessage("Error processing request");
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            {message && <p className="mb-4 text-green-600">{message}</p>}

            <div className="mb-4">
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
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === "lecturer" && (
                    <>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={lecturerName}
                            onChange={(e) => setLecturerName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={lecturerEmail}
                            onChange={(e) => setLecturerEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={lecturerPassword}
                            onChange={(e) => setLecturerPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </>
                )}

                {activeTab === "student" && (
                    <>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </>
                )}

                {activeTab === "course" && (
                    <>
                        <input
                            type="text"
                            placeholder="Course Name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Course Code"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </>
                )}

                {activeTab === "enroll" && (
                    <>
                        <input
                            type="email"
                            placeholder="Student Email"
                            value={enrollStudentEmail}
                            onChange={(e) => setEnrollStudentEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Course Code"
                            value={enrollCourseCode}
                            onChange={(e) => setEnrollCourseCode(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </>
                )}

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AdminPanel;
