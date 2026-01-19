import DashboardSwitcher from "../components/DashboardSwitcher";

export default function AdminDashboard() {
  return (
    <div className="dashboard admin">
      <header>
        <h1>Admin Dashboard</h1>
        <DashboardSwitcher />
      </header>
    </div>
  );
}
