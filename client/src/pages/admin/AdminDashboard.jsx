import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>
    {/* <p className="mb-6 text-gray-700">Welcome, Admin! Use the sidebar or quick links below to manage users, PGs, and bookings.</p> */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Link
        to="/admin/users"
        className="bg-blue-100 p-6 rounded shadow hover:bg-blue-200 transition text-center font-semibold"
      >
        <span className="text-4xl block mb-2">👤</span>
        Manage Users
      </Link>
      <Link
        to="/admin/pgs"
        className="bg-green-100 p-6 rounded shadow hover:bg-green-200 transition text-center font-semibold"
      >
        <span className="text-4xl block mb-2">🏠</span>
        Manage PGs
      </Link>
      <Link
        to="/admin/bookings"
        className="bg-yellow-100 p-6 rounded shadow hover:bg-yellow-200 transition text-center font-semibold"
      >
        <span className="text-4xl block mb-2">📑</span>
        Manage Bookings
      </Link>
    </div>
    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded shadow p-4 text-center">
        <div className="text-2xl font-bold text-blue-700 mb-2">--</div>
        <div className="text-gray-600">Total Users</div>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <div className="text-2xl font-bold text-green-700 mb-2">--</div>
        <div className="text-gray-600">Total PGs</div>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <div className="text-2xl font-bold text-yellow-700 mb-2">--</div>
        <div className="text-gray-600">Total Bookings</div>
      </div>
    </div> */}
  </div>
);

export default AdminDashboard;