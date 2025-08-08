import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const AdminPGs = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPG, setEditPG] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", city: "", ownerId: "", pgType: "", pricePerBed: "" });
  const [viewPG, setViewPG] = useState(null);

  const fetchPGs = () => {
    api.get("/api/pg-properties")
      .then(res => setPgs(res.data))
      .catch(() => toast.error("Failed to fetch PGs"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPGs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PG?")) return;
    try {
      await api.delete(`/api/pg-properties/${id}`);
      toast.success("PG deleted successfully");
      setPgs(pgs.filter(pg => pg.pgId !== id));
    } catch {
      toast.error("Failed to delete PG");
    }
  };

  const handleEdit = (pg) => {
    setEditPG(pg);
    setEditForm({
      name: pg.name || "",
      ownerId: pg.ownerId || "",
      address: pg.address || "",
      city: pg.city || "",
      state: pg.state || "",
      pincode: pg.pincode || "",
      landmark: pg.landmark || "",
      latitude: pg.latitude?.parsedValue ?? pg.latitude ?? "",
      longitude: pg.longitude?.parsedValue ?? pg.longitude ?? "",
      description: pg.description || "",
      totalRooms: pg.totalRooms || "",
      availableRooms: pg.availableRooms || "",
      pricePerBed: pg.pricePerBed?.parsedValue ?? pg.pricePerBed ?? "",
      depositAmount: pg.depositAmount?.parsedValue ?? pg.depositAmount ?? "",
      foodIncluded: pg.foodIncluded ?? false,
      acAvailable: pg.acAvailable ?? false,
      wifiAvailable: pg.wifiAvailable ?? false,
      laundryAvailable: pg.laundryAvailable ?? false,
      pgType: pg.pgType || "",
      rating: pg.rating?.parsedValue ?? pg.rating ?? "",
      verified: pg.verified ?? false,
    });
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const pgId = editPG.pgId;
      const res = await api.put(`/api/pg-properties/${pgId}`, { ...editPG, ...editForm });
      toast.success("PG updated successfully");
      setPgs(pgs.map(pg => pg.pgId === pgId ? res.data : pg));
      setEditPG(null);
    } catch {
      toast.error("Failed to update PG");
    }
  };

  const handleView = async (id) => {
    try {
      const res = await api.get(`/api/pg-properties/${id}`);
      setViewPG(res.data);
    } catch {
      toast.error("Failed to fetch PG details");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All PG Properties</h2>
      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="px-4 py-2 font-semibold rounded-tl-lg">ID</th>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">City</th>
                <th className="px-4 py-2 font-semibold">Owner ID</th>
                <th className="px-4 py-2 font-semibold">Type</th>
                <th className="px-4 py-2 font-semibold">Price/Bed</th>
                <th className="px-4 py-2 font-semibold rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pgs.map((pg, idx) => (
                <tr key={pg.pgId} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50 hover:bg-blue-100 transition"}>
                  <td className="px-4 py-2 border-b">{pg.pgId}</td>
                  <td className="px-4 py-2 border-b">{pg.name}</td>
                  <td className="px-4 py-2 border-b">{pg.city}</td>
                  <td className="px-4 py-2 border-b">{pg.ownerId}</td>
                  <td className="px-4 py-2 border-b">{pg.pgType}</td>
                  <td className="px-4 py-2 border-b">{pg.pricePerBed?.parsedValue ?? pg.pricePerBed}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex gap-4 justify-center">
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-200 transition font-medium" onClick={() => handleView(pg.pgId)}>View</button>
                      <button className="bg-green-100 text-green-700 px-3 py-1 rounded shadow hover:bg-green-200 transition font-medium" onClick={() => handleEdit(pg)}>Edit</button>
                      <button className="bg-red-100 text-red-700 px-3 py-1 rounded shadow hover:bg-red-200 transition font-medium" onClick={() => handleDelete(pg.pgId)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editPG && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Edit PG</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input name="name" value={editForm.name} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Owner ID</label>
                <input name="ownerId" value={editForm.ownerId} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Address</label>
                <input name="address" value={editForm.address || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">City</label>
                <input name="city" value={editForm.city} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">State</label>
                <input name="state" value={editForm.state || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Pincode</label>
                <input name="pincode" value={editForm.pincode || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Landmark</label>
                <input name="landmark" value={editForm.landmark || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Latitude</label>
                <input name="latitude" value={editForm.latitude || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Longitude</label>
                <input name="longitude" value={editForm.longitude || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea name="description" value={editForm.description || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Total Rooms</label>
                <input name="totalRooms" value={editForm.totalRooms || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Available Rooms</label>
                <input name="availableRooms" value={editForm.availableRooms || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Price/Bed</label>
                <input name="pricePerBed" value={editForm.pricePerBed || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Deposit Amount</label>
                <input name="depositAmount" value={editForm.depositAmount || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Food Included</label>
                <select name="foodIncluded" value={editForm.foodIncluded ? "true" : "false"} onChange={e => setEditForm(f => ({ ...f, foodIncluded: e.target.value === "true" }))} className="border rounded px-2 py-1 w-full">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">AC Available</label>
                <select name="acAvailable" value={editForm.acAvailable ? "true" : "false"} onChange={e => setEditForm(f => ({ ...f, acAvailable: e.target.value === "true" }))} className="border rounded px-2 py-1 w-full">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">WiFi Available</label>
                <select name="wifiAvailable" value={editForm.wifiAvailable ? "true" : "false"} onChange={e => setEditForm(f => ({ ...f, wifiAvailable: e.target.value === "true" }))} className="border rounded px-2 py-1 w-full">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Laundry Available</label>
                <select name="laundryAvailable" value={editForm.laundryAvailable ? "true" : "false"} onChange={e => setEditForm(f => ({ ...f, laundryAvailable: e.target.value === "true" }))} className="border rounded px-2 py-1 w-full">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Type</label>
                <select name="pgType" value={editForm.pgType} onChange={handleEditChange} className="border rounded px-2 py-1 w-full">
                  <option value="MALE_ONLY">Boys</option>
                  <option value="FEMALE_ONLY">Girls</option>
                  <option value="UNISEX">Unisex</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Rating</label>
                <input name="rating" value={editForm.rating || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Verified</label>
                <select name="verified" value={editForm.verified ? "true" : "false"} onChange={e => setEditForm(f => ({ ...f, verified: e.target.value === "true" }))} className="border rounded px-2 py-1 w-full">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditPG(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewPG && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">PG Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {viewPG.pgId ?? viewPG.id}</p>
              <p><strong>Name:</strong> {viewPG.name}</p>
              <p><strong>Owner ID:</strong> {viewPG.ownerId}</p>
              <p><strong>Address:</strong> {viewPG.address}</p>
              <p><strong>City:</strong> {viewPG.city}</p>
              <p><strong>State:</strong> {viewPG.state}</p>
              <p><strong>Pincode:</strong> {viewPG.pincode}</p>
              <p><strong>Landmark:</strong> {viewPG.landmark}</p>
              <p><strong>Latitude:</strong> {viewPG.latitude?.parsedValue ?? viewPG.latitude}</p>
              <p><strong>Longitude:</strong> {viewPG.longitude?.parsedValue ?? viewPG.longitude}</p>
              <p><strong>Description:</strong> {viewPG.description}</p>
              <p><strong>Total Rooms:</strong> {viewPG.totalRooms}</p>
              <p><strong>Available Rooms:</strong> {viewPG.availableRooms}</p>
              <p><strong>Price/Bed:</strong> {viewPG.pricePerBed?.parsedValue ?? viewPG.pricePerBed}</p>
              <p><strong>Deposit Amount:</strong> {viewPG.depositAmount?.parsedValue ?? viewPG.depositAmount}</p>
              <p><strong>Food Included:</strong> {viewPG.foodIncluded ? "Yes" : "No"}</p>
              <p><strong>AC Available:</strong> {viewPG.acAvailable ? "Yes" : "No"}</p>
              <p><strong>WiFi Available:</strong> {viewPG.wifiAvailable ? "Yes" : "No"}</p>
              <p><strong>Laundry Available:</strong> {viewPG.laundryAvailable ? "Yes" : "No"}</p>
              <p><strong>Type:</strong> {viewPG.pgType}</p>
              <p><strong>Rating:</strong> {viewPG.rating?.parsedValue ?? viewPG.rating}</p>
              <p><strong>Verified:</strong> {viewPG.verified ? "Yes" : "No"}</p>
              <p><strong>Created At:</strong> {viewPG.createdAt ?? "-"}</p>
              <p><strong>Updated At:</strong> {viewPG.updatedAt ?? "-"}</p>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setViewPG(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPGs;