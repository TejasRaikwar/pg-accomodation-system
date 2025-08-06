import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleRegisterPG = () => navigate("/owner/register-pg");
  const handleManageRooms = (pgId) => navigate(`/owner/pgs/${pgId}/rooms`);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.fullName || "Owner"} 👋
      </h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={handleRegisterPG}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Register New PG
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📄 View Listed PGs
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading your PG listings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pgs.length === 0 ? (
        <p className="text-gray-600">You haven’t listed any PGs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgs.map((pg) => (
            <div
              key={pg.id}
              className="bg-white p-6 shadow rounded-lg border hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{pg.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>City:</strong> {pg.city}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Price/Bed:</strong> ₹{pg.pricePerBed}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>PG Type:</strong>{" "}
                {pg.pgType === "MALE_ONLY"
                  ? "Boys"
                  : pg.pgType === "FEMALE_ONLY"
                  ? "Girls"
                  : "Unisex"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Available Beds:</strong> {pg.availableBeds}
              </p>

              <button
                onClick={() => handleManageRooms(pg.id)}
                className="text-blue-600 hover:underline text-sm"
              >
                🛏 Manage Rooms
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
