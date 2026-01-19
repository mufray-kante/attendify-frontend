import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import "./styles/theme.css";
import "./styles/dashboard.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lecturer/dashboard"
          element={
            <ProtectedRoute allowedRole="lecturer">
              <LecturerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
