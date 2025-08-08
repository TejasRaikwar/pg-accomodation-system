import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterUserId, setFilterUserId] = useState("");
    const [filterPgId, setFilterPgId] = useState("");
    const [statusUpdate, setStatusUpdate] = useState({});
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelId, setCancelId] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            let res;
            if (filterUserId) {
                res = await api.get(`/api/bookings/user/${filterUserId}`);
            } else if (filterPgId) {
                res = await api.get(`/api/bookings/pg/${filterPgId}`);
            } else {
                res = await api.get("/api/bookings");
            }
            setBookings(res.data);
        } catch {
            toast.error("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [filterUserId, filterPgId]);

    // Remove handleCancel and modal logic since Cancel button is removed

    const handleStatusChange = (id, status) => {
        setStatusUpdate({ ...statusUpdate, [id]: status });
    };

    const handleStatusUpdate = async (id) => {
        const status = statusUpdate[id];
        if (!status) return;
        try {
            await api.put(`/api/bookings/${id}/status?status=${status}`);
            toast.success("Status updated");
            setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
        } catch {
            toast.error("Failed to update status");
        }
    };

    const handleEnriched = async (pgId) => {
        setLoading(true);
        try {
            const res = await api.get(`/api/bookings/pg/${pgId}/with-usernames`);
            setBookings(res.data);
        } catch {
            toast.error("Failed to fetch enriched bookings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
            <div className="mb-4 flex gap-4">
                <input type="number" placeholder="Filter by User ID" value={filterUserId} onChange={e => {setFilterUserId(e.target.value); setFilterPgId("");}} className="border px-2 py-1 rounded" />
                <input type="number" placeholder="Filter by PG ID" value={filterPgId} onChange={e => {setFilterPgId(e.target.value); setFilterUserId("");}} className="border px-2 py-1 rounded" />
            </div>
            {loading ? <p>Loading...</p> : (
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1">ID</th>
                            <th className="border px-2 py-1">PG ID</th>
                            <th className="border px-2 py-1">User ID</th>
                            <th className="border px-2 py-1">Status</th>
                            <th className="border px-2 py-1">Start</th>
                            <th className="border px-2 py-1">End</th>
                            <th className="border px-2 py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b.id}>
                                <td className="border px-2 py-1">{b.id}</td>
                                <td className="border px-2 py-1">{b.pgId}</td>
                                <td className="border px-2 py-1">{b.userId ?? b.username ?? "-"}</td>
                                <td className="border px-2 py-1">{b.status}</td>
                                <td className="border px-2 py-1">{b.startDate ? new Date(b.startDate).toLocaleDateString() : ""}</td>
                                <td className="border px-2 py-1">{b.endDate ? new Date(b.endDate).toLocaleDateString() : ""}</td>
                                <td className="border px-2 py-1">
                                    <div className="flex gap-3">
                                        <select value={statusUpdate[b.id] !== undefined ? statusUpdate[b.id] : b.status} onChange={e => handleStatusChange(b.id, e.target.value)} className="border rounded px-1 py-0.5">
                                            <option value="PENDING">Pending</option>
                                            <option value="CONFIRMED">Confirmed</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                        <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-200 transition font-medium" onClick={() => handleStatusUpdate(b.id)}>Update Status</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
        {/* ...existing code... */}
    </div>
    );
};

export default AdminBookings;