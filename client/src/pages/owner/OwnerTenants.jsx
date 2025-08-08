import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const OwnerTenants = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchTenants = async () => {
    try {
      if (!user || user.userType !== "OWNER") {
        setError("Unauthorized or user not available.");
        return;
      }

      const ownerId = user.userid;
      const pgRes = await axios.get(`/api/pg-properties/owner/${ownerId}`);
      const pgList = pgRes.data;

      if (!pgList || pgList.length === 0) {
        setBookings([]);
        return;
      }

      const bookingPromises = pgList.map((pg) =>
        axios.get(`/api/bookings/pg/${pg.pgId}/owner/${ownerId}`)
      );

      const bookingResponses = await Promise.all(bookingPromises);

      const allBookings = bookingResponses.flatMap((res, index) =>
        res.data.map((booking) => ({
          ...booking,
          pgName: pgList[index].name || `PG ID: ${pgList[index].pgId}`,
        }))
      );

      setBookings(allBookings);
    } catch (err) {
      console.error("Error fetching tenants:", err);
      setError("Failed to load tenants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, [user]);

  useEffect(() => {
    const statusMap = {};
    bookings.forEach((b) => {
      statusMap[b.id] = b.status;
    });
    setSelectedStatus(statusMap);
  }, [bookings]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Tenants</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No tenants found.</p>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-4">
            <label
              htmlFor="tenant-search"
              className="font-medium text-gray-700"
            >
              Search:
            </label>
            <input
              id="tenant-search"
              type="text"
              className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Type tenant name, PG name, status, or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid gap-4">
            {bookings
              .filter((booking) => {
                const q = search.trim().toLowerCase();
                if (!q) return true;
                return (
                  booking.username?.toLowerCase().includes(q) ||
                  booking.pgName?.toLowerCase().includes(q) ||
                  booking.status?.toLowerCase().includes(q) ||
                  (booking.startDate &&
                    new Date(booking.startDate)
                      .toLocaleDateString()
                      .toLowerCase()
                      .includes(q)) ||
                  (booking.endDate &&
                    new Date(booking.endDate)
                      .toLocaleDateString()
                      .toLowerCase()
                      .includes(q))
                );
              })
              .map((booking) => {
                const localStatus = selectedStatus[booking.id] ?? booking.status;
                const statusUnchanged = localStatus === booking.status;

                return (
                  <div
                    key={booking.id}
                    className="border p-4 bg-white rounded shadow"
                  >
                    <h2 className="text-lg font-bold mb-1">
                      PG: {booking.pgName || "Unknown PG"}
                    </h2>
                    <p>Tenant Name: {booking.username}</p>
                    <div className="mb-2">
                      <label className="font-medium mr-2">Status:</label>
                      <select
                        value={localStatus}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setSelectedStatus((prev) => ({
                            ...prev,
                            [booking.id]: newStatus,
                          }));
                        }}
                        className="border rounded px-2 py-1 mr-2"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                      <button
                        className={`px-3 py-1 rounded text-white ${
                          statusUnchanged
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        disabled={statusUnchanged}
                        onClick={async () => {
                          try {
                            const res = await axios.put(
                              `/api/bookings/${booking.id}/status?status=${localStatus}`
                            );
                            toast.success(res.data || "Status updated successfully");
                            setBookings((prev) =>
                              prev.map((b) =>
                                b.id === booking.id
                                  ? { ...b, status: localStatus }
                                  : b
                              )
                            );
                          } catch (err) {
                            toast.error(
                              err?.response?.data || "Failed to update status"
                            );
                          }
                        }}
                      >
                        Update Status
                      </button>
                    </div>
                    <p>
                      Start Date:{" "}
                      {booking.startDate
                        ? new Date(booking.startDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      End Date:{" "}
                      {booking.endDate
                        ? new Date(booking.endDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerTenants;
