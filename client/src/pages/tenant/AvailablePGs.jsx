import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const AvailablePGs = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingPGId, setBookingPGId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await api.get("/api/pg-properties");
        setPgs(res.data);
      } catch (err) {
        console.error("Failed to fetch PGs:", err);
        toast.error("Failed to load PGs");
      } finally {
        setLoading(false);
      }
    };
    fetchPGs();
  }, []);

  const handleBookNow = async (pgObj) => {
    if (!user || user.userType !== "TENANT") {
      toast.error("Only tenants can book PGs");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }

    const bookingPayload = {
      userId: user.userid,
      pgId: pgObj.pgId,
      startDate: startDate + "T00:00:00",
      endDate: endDate + "T00:00:00",
    };

    try {
      setBookingPGId(pgObj.pgId);
      await api.post("/api/bookings", bookingPayload);
      toast.success("Booking successful!");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error("Booking failed:", err);
      toast.error("Booking failed!");
    } finally {
      setBookingPGId(null);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-4">Available PGs</h1>
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex gap-2 items-center">
          <label className="font-medium">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
          <label className="font-medium">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <input
          type="text"
          className="border p-2 rounded w-64"
          placeholder="Search by name, city, type, address..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : pgs.length === 0 ? (
        <p>No PGs available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgs.filter(pg => {
            const q = search.trim().toLowerCase();
            if (!q) return true;
            return (
              pg.name?.toLowerCase().includes(q) ||
              pg.city?.toLowerCase().includes(q) ||
              pg.pgType?.toLowerCase().includes(q) ||
              pg.address?.toLowerCase().includes(q) ||
              pg.description?.toLowerCase().includes(q)
            );
          }).map((pg) => (
            <div key={pg.pgId} className="border p-6 bg-white rounded-xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-blue-800">{pg.name}</h2>
                  {pg.verified && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Verified</span>}
                </div>
                <p className="text-gray-700 mb-1"><span className="font-semibold">{pg.pgType?.replace('_', ' ')}</span> &bull; <span className="text-blue-700">₹{pg.pricePerBed?.parsedValue ?? pg.pricePerBed}/bed</span></p>
                <p className="text-gray-500 mb-1">{pg.address}, {pg.city}, {pg.state} - {pg.pincode}</p>
                <p className="text-gray-500 mb-1">Landmark: {pg.landmark}</p>
                <p className="text-gray-500 mb-1">Owner ID: {pg.ownerId}</p>
                <p className="text-gray-500 mb-1">Description: <span className="italic">{pg.description}</span></p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-gray-600">Rooms: <span className="font-semibold">{pg.availableRooms}</span> / {pg.totalRooms}</p>
                  <p className="text-gray-600">Deposit: <span className="font-semibold">₹{pg.depositAmount?.parsedValue ?? pg.depositAmount}</span></p>
                  <p className="text-gray-600">Food: {pg.foodIncluded ? <span className="text-green-700">🍽️ Yes</span> : <span className="text-red-700">No</span>}</p>
                  <p className="text-gray-600">AC: {pg.acAvailable ? <span className="text-green-700">❄️ Yes</span> : <span className="text-red-700">No</span>}</p>
                  <p className="text-gray-600">WiFi: {pg.wifiAvailable ? <span className="text-green-700">📶 Yes</span> : <span className="text-red-700">No</span>}</p>
                  <p className="text-gray-600">Laundry: {pg.laundryAvailable ? <span className="text-green-700">🧺 Yes</span> : <span className="text-red-700">No</span>}</p>
                  <p className="text-gray-600">Rating: <span className="font-semibold">⭐ {pg.rating?.parsedValue ?? pg.rating}</span></p>
                </div>
              </div>
              <button
                onClick={() => handleBookNow(pg)}
                disabled={bookingPGId === pg.pgId}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                {bookingPGId === pg.pgId ? "Booking..." : "Book Now"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailablePGs;
