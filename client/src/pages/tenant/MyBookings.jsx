import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/api/bookings/user/${user.userid}`);
      setBookings(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await api.delete(`/api/bookings/${bookingId}`);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (error) {
      toast.error("Cancellation failed");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="border rounded shadow p-4">
              <p><strong>Booking ID:</strong> {b.id}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <p><strong>Start:</strong> {new Date(b.startDate).toLocaleDateString()}</p>
              <p><strong>End:</strong> {new Date(b.endDate).toLocaleDateString()}</p>
              <hr className="my-2" />
              <p><strong>PG Name:</strong> {b.pg?.name}</p>
              <p><strong>Address:</strong> {b.pg?.address}, {b.pg?.city}, {b.pg?.state} - {b.pg?.pincode}</p>
              <p><strong>Landmark:</strong> {b.pg?.landmark}</p>
              <p><strong>Type:</strong> {b.pg?.pgType}</p>
              <p><strong>Price per Bed:</strong> ₹{b.pg?.pricePerBed}</p>
              <p><strong>Available Rooms:</strong> {b.pg?.availableRooms}</p>
              <p><strong>Rating:</strong> {b.pg?.rating}</p>
              <button
                onClick={() => handleCancel(b.id)}
                className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
