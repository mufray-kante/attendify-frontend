import React, { useState } from "react";
import QRCode from "qrcode.react";

const AdminPanel = () => {
    const [lecturer, setLecturer] = useState({ name: "", email: "", password: "" });
    const [student, setStudent] = useState({ name: "", email: "" });
    const [course, setCourse] = useState({ title: "", code: "" });
    const [qrCode, setQrCode] = useState("");

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    // Helper to POST data
    const postData = async (path, data) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendURL}/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(data),
        });
        return res.json();
    };

    // Create lecturer
    const handleCreateLecturer = async (e) => {
        e.preventDefault();
        const result = await postData("auth/register-lecturer", lecturer);
        alert(result.message || JSON.stringify(result));
    };

    // Create student
    const handleCreateStudent = async (e) => {
        e.preventDefault();
        const result = await postData("auth/register-student", student);
        alert(result.message || JSON.stringify(result));
    };

    // Create course
    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const result = await postData("courses", course);
        alert(result.message || JSON.stringify(result));
    };

    // Generate QR code (attendance session)
    const handleGenerateQR = async () => {
        const duration = prompt("Enter session duration in minutes", "30");
        if (!duration) return;
        const result = await postData("attendance-sessions/start", {
            courseId: prompt("Enter Course ID"),
            durationMinutes: Number(duration)
        });
        if (result.pin) {
            setQrCode(result.pin);
            alert("Session created! QR code generated.");
        } else {
            alert("Failed to generate QR");
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

            {/* Lecturer Form */}
            <form onSubmit={handleCreateLecturer} className="p-4 border rounded space-y-2">
                <h3 className="font-semibold">Add Lecturer</h3>
                <input placeholder="Name" value={lecturer.name} onChange={e => setLecturer({ ...lecturer, name: e.target.value })} className="border p-1 rounded w-full" required />
                <input placeholder="Email" value={lecturer.email} onChange={e => setLecturer({ ...lecturer, email: e.target.value })} className="border p-1 rounded w-full" required />
                <input placeholder="Password" type="password" value={lecturer.password} onChange={e => setLecturer({ ...lecturer, password: e.target.value })} className="border p-1 rounded w-full" required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Lecturer</button>
            </form>

            {/* Student Form */}
            <form onSubmit={handleCreateStudent} className="p-4 border rounded space-y-2">
                <h3 className="font-semibold">Add Student</h3>
                <input placeholder="Name" value={student.name} onChange={e => setStudent({ ...student, name: e.target.value })} className="border p-1 rounded w-full" required />
                <input placeholder="Email" value={student.email} onChange={e => setStudent({ ...student, email: e.target.value })} className="border p-1 rounded w-full" required />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">Create Student</button>
            </form>

            {/* Course Form */}
            <form onSubmit={handleCreateCourse} className="p-4 border rounded space-y-2">
                <h3 className="font-semibold">Add Course</h3>
                <input placeholder="Title" value={course.title} onChange={e => setCourse({ ...course, title: e.target.value })} className="border p-1 rounded w-full" required />
                <input placeholder="Code" value={course.code} onChange={e => setCourse({ ...course, code: e.target.value })} className="border p-1 rounded w-full" required />
                <button type="submit" className="bg-yellow-500 text-white p-2 rounded">Create Course</button>
            </form>

            {/* QR Code Generator */}
            <div className="p-4 border rounded space-y-2">
                <h3 className="font-semibold">Generate Attendance QR Code</h3>
                <button onClick={handleGenerateQR} className="bg-purple-500 text-white p-2 rounded">Generate QR</button>
                {qrCode && <div className="mt-2"><QRCode value={qrCode} size={128} /></div>}
            </div>
        </div>
    );
};

export default AdminPanel;
