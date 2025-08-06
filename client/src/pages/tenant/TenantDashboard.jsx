import React from "react";

const TenantDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Tenant Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
          <p className="text-gray-600">View all your booking requests and status updates.</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Explore PGs</h2>
          <p className="text-gray-600">Browse PGs by city, availability, and amenities.</p>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
