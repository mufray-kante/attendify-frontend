import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import StudentDashboard from "./pages/StudentDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ENTRY POINT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* LECTURER */}
        <Route
          path="/lecturer/dashboard"
          element={
            <ProtectedRoute allowedRole="lecturer">
              <LecturerDashboard />
            </ProtectedRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
