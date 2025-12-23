// src/Layout/DashboardLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Fake auth for demo; later replace with real auth
const getUserRole = () => {
  return localStorage.getItem("role"); // "chairperson" or "member"
};

export default function DashboardLayout() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const r = getUserRole();
    setRole(r);
  }, []);

  if (!role) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Smart Chama</h2>
        <ul className="space-y-4">
          {role === "chairperson" && (
            <>
              <li>Dashboard</li>
              <li>Manage Members</li>
              <li>Invites</li>
              <li>Reports</li>
            </>
          )}
          {role === "member" && (
            <>
              <li>Dashboard</li>
              <li>Contributions</li>
              <li>Loans</li>
              <li>Profile</li>
            </>
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
