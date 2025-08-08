import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => (
  <div className="flex min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
    <aside className="w-72 bg-gray-900 text-white p-8 flex flex-col justify-between shadow-lg">
      <nav className="flex flex-col gap-4 mt-2">
        <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          <span>📊</span> <span>Dashboard</span>
        </Link>
        <Link to="/admin/users" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          <span>👤</span> <span>Manage Users</span>
        </Link>
        <Link to="/admin/pgs" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          <span>🏠</span> <span>Manage PGs</span>
        </Link>
        <Link to="/admin/bookings" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          <span>📑</span> <span>Manage Bookings</span>
        </Link>
      </nav>
      <div className="mt-8 text-sm text-gray-300 text-center">
        &copy; {new Date().getFullYear()} PG Accommodation Admin
      </div>
    </aside>
    <main className="flex-1 bg-white p-8 rounded-l-3xl shadow-xl">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;