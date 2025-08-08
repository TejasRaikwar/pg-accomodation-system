import React from "react";
import { Link } from "react-router-dom";

const TenantDashboard = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6">Tenant Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link
        to="/tenant/available-pgs"
        className="bg-blue-100 p-6 rounded shadow hover:bg-blue-200 transition text-center font-semibold"
      >
        View & Book PGs
      </Link>
      <Link
        to="/tenant/my-bookings"
        className="bg-green-100 p-6 rounded shadow hover:bg-green-200 transition text-center font-semibold"
      >
        My Bookings
      </Link>

    </div>
  </div>
);

export default TenantDashboard;
