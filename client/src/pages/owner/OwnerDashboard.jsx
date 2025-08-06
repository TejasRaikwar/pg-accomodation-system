import React from "react";

const OwnerDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">My PG Listings</h2>
          <p className="text-gray-600">Manage your PGs, rooms, and amenities.</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Tenant Requests</h2>
          <p className="text-gray-600">View and manage tenant booking requests.</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
