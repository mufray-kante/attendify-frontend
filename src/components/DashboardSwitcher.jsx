import { useNavigate } from "react-router-dom";

export default function DashboardSwitcher() {
  const navigate = useNavigate();

  const switchTo = (role) => {
    localStorage.setItem("role", role);

    if (role === "admin") navigate("/admin/dashboard");
    if (role === "lecturer") navigate("/lecturer/dashboard");
    if (role === "student") navigate("/student/dashboard");
  };

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <button onClick={() => switchTo("admin")}>Admin</button>
      <button onClick={() => switchTo("lecturer")}>Lecturer</button>
      <button onClick={() => switchTo("student")}>Student</button>
    </div>
  );
}
