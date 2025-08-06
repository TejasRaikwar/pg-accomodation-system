import { useEffect, useState } from "react";
import api from "../../services/api";

const ViewPGs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await api.get(`/api/pg-properties/owner/${user.userid}`);
        setPgs(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load PG listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, [user.id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📄 Your PG Listings</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pgs.length === 0 ? (
        <p>No PGs listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgs.map((pg) => (
            <div
              key={pg.id}
              className="bg-white shadow-md rounded-lg p-5 border"
            >
              <h2 className="text-lg font-semibold">{pg.name}</h2>
              <p className="text-sm text-gray-600">City: {pg.city}</p>
              <p className="text-sm text-gray-600">
                PG Type: {pg.pgType.replace("_", " ")}
              </p>
              <p className="text-sm text-gray-600">
                Beds: {pg.availableRooms}/{pg.totalRooms}
              </p>
              <p className="text-sm text-gray-600">
                ₹ {pg.pricePerBed} per bed
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPGs;
