import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwnerPGs = async () => {
      try {
        const res = await api.get(`/api/pg-properties/owner/${user.id}`);
        setPgs(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch PG listings.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchOwnerPGs();
  }, [user?.id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        👤 Welcome, {user?.fullName || "Owner"} 👋
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/owner/register-pg"
          className="bg-blue-100 p-6 rounded shadow hover:bg-blue-200 transition text-center font-semibold"
        >
          <span className="text-4xl block mb-2">➕</span>
          Register New PG
        </Link>
        <Link
          to="/owner/pg-list"
          className="bg-green-100 p-6 rounded shadow hover:bg-green-200 transition text-center font-semibold"
        >
          <span className="text-4xl block mb-2">📄</span>
          View PG Listings
        </Link>
        <Link
          to="/owner/tenants"
          className="bg-yellow-100 p-6 rounded shadow hover:bg-yellow-200 transition text-center font-semibold"
        >
          <span className="text-4xl block mb-2">👥</span>
          Your Tenants
        </Link>
      </div>

      {error ? (
        <p className="text-red-500 text-lg font-semibold text-center mt-8">
          {error}
        </p>
      ) : pgs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600 text-lg">
            {/* You haven’t listed any PGs yet. */}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pgs.map((pg) => (
            <div
              key={pg.id || pg.pgId}
              className="bg-white p-6 shadow-lg rounded-2xl border hover:shadow-2xl transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-blue-800">{pg.name}</h2>
                  {pg.verified && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">
                    {pg.pgType === "MALE_ONLY"
                      ? "Boys"
                      : pg.pgType === "FEMALE_ONLY"
                      ? "Girls"
                      : "Unisex"}
                  </span>{" "}
                  &bull;{" "}
                  <span className="text-blue-700">
                    ₹{pg.pricePerBed?.parsedValue ?? pg.pricePerBed}/bed
                  </span>
                </p>
                <p className="text-gray-500 mb-1">
                  {pg.address}, {pg.city}
                </p>
                <p className="text-gray-500 mb-1">Landmark: {pg.landmark}</p>
                <p className="text-gray-500 mb-1">
                  Description: <span className="italic">{pg.description}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-gray-600">
                    Rooms:{" "}
                    <span className="font-semibold">
                      {pg.availableRooms ?? pg.availableBeds}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Deposit:{" "}
                    <span className="font-semibold">
                      ₹{pg.depositAmount?.parsedValue ?? pg.depositAmount}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Food:{" "}
                    {pg.foodIncluded ? (
                      <span className="text-green-700">🍽️ Yes</span>
                    ) : (
                      <span className="text-red-700">No</span>
                    )}
                  </p>
                  <p className="text-gray-600">
                    AC:{" "}
                    {pg.acAvailable ? (
                      <span className="text-green-700">❄️ Yes</span>
                    ) : (
                      <span className="text-red-700">No</span>
                    )}
                  </p>
                  <p className="text-gray-600">
                    WiFi:{" "}
                    {pg.wifiAvailable ? (
                      <span className="text-green-700">📶 Yes</span>
                    ) : (
                      <span className="text-red-700">No</span>
                    )}
                  </p>
                  <p className="text-gray-600">
                    Laundry:{" "}
                    {pg.laundryAvailable ? (
                      <span className="text-green-700">🧺 Yes</span>
                    ) : (
                      <span className="text-red-700">No</span>
                    )}
                  </p>
                  <p className="text-gray-600">
                    Rating:{" "}
                    <span className="font-semibold">
                      ⭐ {pg.rating?.parsedValue ?? pg.rating}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/owner/pgs/${pg.id || pg.pgId}/rooms`)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition flex items-center gap-2"
              >
                <span>🛏</span> Manage Rooms
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
