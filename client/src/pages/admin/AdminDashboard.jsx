import React from "react";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p className="text-gray-600">View and control access to all registered users in the system.</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">All PG Listings</h2>
          <p className="text-gray-600">Monitor and verify all PG properties listed by owners.</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p className="text-gray-600">Generate platform activity reports and monitor system usage.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
