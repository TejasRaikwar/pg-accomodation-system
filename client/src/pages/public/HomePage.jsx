import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const HomePage = () => {
  const [pgs, setPgs] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [filteredPgs, setFilteredPgs] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

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
    if (!user) {
      toast.error("Please login to book a PG.");
      navigate("/login");
      return;
    }
    navigate("/tenant/available-pgs");
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
          className="border rounded p-2 w-full max-w-md shadow focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {filteredPgs.length === 0 ? (
        <p className="text-center text-gray-500">No PGs found in this city.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPgs.map((pg) => (
            <div
              key={pg.id || pg.pgId}
              className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition flex flex-col justify-between"
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
                      ? "Male"
                      : pg.pgType === "FEMALE_ONLY"
                      ? "Female"
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
                  Description:{" "}
                  <span className="italic">{pg.description}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-gray-600">
                    Rooms:{" "}
                    <span className="font-semibold">{pg.availableRooms}</span>
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
                onClick={() => handleBookNow(pg.id || pg.pgId)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
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
