export default function DashboardSwitcher() {
  const switchTo = (role) => {
    localStorage.setItem("role", role);
    window.location.href = `/${role}/dashboard`;
  };

  return (
    <div className="dashboard-switcher">
      <button onClick={() => switchTo("admin")}>Admin</button>
      <button onClick={() => switchTo("lecturer")}>Lecturer</button>
      <button onClick={() => switchTo("student")}>Student</button>
    </div>
  );
}
