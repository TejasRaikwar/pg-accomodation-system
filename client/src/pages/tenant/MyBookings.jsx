import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBookings = async () => {
    try {
      // Use the full details endpoint
      const res = await api.get(`/api/bookings/user/${user.userid}/full`);
      setBookings(res.data);
    } catch (error) {
      toast.error("Error fetching bookings");
    } finally {
      setLoading(false);
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

  // Helper for status color
  const statusColor = status => {
    if (status === "CONFIRMED") return "text-green-700 bg-green-100";
    if (status === "CANCELLED") return "text-red-700 bg-red-100";
    return "text-yellow-700 bg-yellow-100";
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map(b => (
            <div key={b.id} className="border rounded shadow p-4 bg-white">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <div>
                  <span className="font-bold">Booking ID:</span> {b.id}
                </div>
                <div className={`px-3 py-1 rounded font-semibold ${statusColor(b.status)}`}>{b.status}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>PG Name:</strong> {b.pg?.name}</p>
                  <p><strong>Type:</strong> {b.pg?.pgType?.replace('_', ' ')}</p>
                  <p><strong>Address:</strong> {b.pg?.address}, {b.pg?.city}, {b.pg?.state} - {b.pg?.pincode}</p>
                  <p><strong>Landmark:</strong> {b.pg?.landmark}</p>
                  <p><strong>Description:</strong> {b.pg?.description}</p>
                  <p><strong>Owner ID:</strong> {b.pg?.ownerId}</p>
                </div>
                <div>
                  <p><strong>Price per Bed:</strong> ₹{b.pg?.pricePerBed}</p>
                  <p><strong>Deposit Amount:</strong> ₹{b.pg?.depositAmount}</p>
                  <p><strong>Available Rooms:</strong> {b.pg?.availableRooms} / {b.pg?.totalRooms}</p>
                  <p><strong>Food Included:</strong> {b.pg?.foodIncluded ? "Yes" : "No"}</p>
                  <p><strong>AC:</strong> {b.pg?.acAvailable ? "Yes" : "No"}</p>
                  <p><strong>WiFi:</strong> {b.pg?.wifiAvailable ? "Yes" : "No"}</p>
                  <p><strong>Laundry:</strong> {b.pg?.laundryAvailable ? "Yes" : "No"}</p>
                  <p><strong>Rating:</strong> {b.pg?.rating}</p>
                  <p><strong>Verified:</strong> {b.pg?.verified ? "Yes" : "No"}</p>
                </div>
              </div>
              <hr className="my-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Booking Date:</strong> {b.bookingDate ? new Date(b.bookingDate).toLocaleString() : '-'}</p>
                  <p><strong>Start:</strong> {b.startDate ? new Date(b.startDate).toLocaleDateString() : '-'}</p>
                  <p><strong>End:</strong> {b.endDate ? new Date(b.endDate).toLocaleDateString() : '-'}</p>
                </div>
                <div className="flex items-end justify-end">
                  {b.status !== "CANCELLED" && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
