import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TenantLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <aside className="w-72 bg-blue-800 text-white p-8 flex flex-col justify-between shadow-lg">
        <nav className="flex flex-col gap-4 mt-2">
          <Link to="/tenant/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <span role="img" aria-label="dashboard">📊</span> <span>Dashboard</span>
          </Link>
          <Link to="/tenant/available-pgs" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <span>🏠</span> <span>Available PGs</span>
          </Link>
          <Link to="/tenant/my-bookings" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <span>📑</span> <span>My Bookings</span>
          </Link>
        </nav>
        <div className="mt-8 text-sm text-blue-200 text-center">
          &copy; {new Date().getFullYear()} PG Accommodation Tenant
        </div>
      </aside>
      <main className="flex-1 bg-white p-8 rounded-l-3xl shadow-xl">
        <Outlet />
      </main>
    </div>
  );
};

export default TenantLayout;
