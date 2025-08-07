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
      <div className="mb-4 flex gap-4 items-center">
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
      {loading ? (
        <p>Loading...</p>
      ) : pgs.length === 0 ? (
        <p>No PGs available at the moment.</p>
      ) : (
        <div className="grid gap-4">
          {pgs.map((pg) => (
            <div key={pg.pgId} className="border p-4 bg-white rounded shadow">
              <h2 className="text-lg font-semibold mb-1">{pg.name}</h2>
              <p className="text-gray-600">{pg.address}</p>
              <p className="text-gray-500">City: {pg.city}</p>
              <p className="text-gray-500">Type: {pg.pgType}</p>
              <button
                onClick={() => handleBookNow(pg)}
                disabled={bookingPGId === pg.pgId}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
