import React, { useState } from "react";
import AdminLayout from "./components/admin/AdminLayout";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  return user ? <AdminLayout /> : <Login onLoginSuccess={(data) => setUser(data)} />;
}

export default App;
