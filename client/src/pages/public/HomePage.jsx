import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const HomePage = () => {
  const [pgs, setPgs] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [filteredPgs, setFilteredPgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await api.get("/api/pg-properties");
        setPgs(res.data);
        setFilteredPgs(res.data);
      } catch (err) {
        console.error("Failed to load PGs", err);
      }
    };

    fetchPGs();
  }, []);

  useEffect(() => {
    if (cityFilter.trim() === "") {
      setFilteredPgs(pgs);
    } else {
      const filtered = pgs.filter((pg) =>
        pg.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
      setFilteredPgs(filtered);
    }
  }, [cityFilter, pgs]);

  const handleBookNow = (pgId) => {
    navigate(`/pg/${pgId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🏠 Find Your Perfect PG Accommodation
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by city..."
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border rounded p-2 w-full max-w-md"
        />
      </div>

      {filteredPgs.length === 0 ? (
        <p className="text-center text-gray-500">No PGs found in this city.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPgs.map((pg) => (
            <div
              key={pg.id}
              className="bg-white rounded shadow-md p-5 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-1">{pg.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                📍 {pg.address}, {pg.city}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                💰 ₹{pg.pricePerBed} / bed
              </p>
              <p className="text-sm text-gray-600 mb-1">
                🏠 Type:{" "}
                {pg.pgType === "MALE_ONLY"
                  ? "Male"
                  : pg.pgType === "FEMALE_ONLY"
                  ? "Female"
                  : "Unisex"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                🛏 Available Rooms: {pg.availableRooms}
              </p>

              <button
                onClick={() => handleBookNow(pg.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
