import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const RegisterPG = () => {
  const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
   const {user} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    latitude: "",
    longitude: "",
    description: "",
    totalRooms: "",
    availableRooms: "",
    pricePerBed: "",
    depositAmount: "",
    foodIncluded: false,
    acAvailable: false,
    wifiAvailable: false,
    laundryAvailable: false,
    pgType: "",
    rating: "",
    verified: false,
    ownerId: user.userid,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        ownerId: user?.id,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        totalRooms: parseInt(formData.totalRooms),
        availableRooms: parseInt(formData.availableRooms),
        pricePerBed: parseFloat(formData.pricePerBed),
        depositAmount: parseFloat(formData.depositAmount),
        rating: parseFloat(formData.rating),
      };

      await api.post("/api/pg-properties", payload);
      setSuccess("PG Registered Successfully!");
      setTimeout(() => navigate("/owner/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to register PG. Check all fields.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register New PG</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" placeholder="PG Name" value={formData.name} onChange={handleChange} required className="p-2 border rounded" />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="p-2 border rounded" />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="p-2 border rounded" />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="p-2 border rounded" />
        <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required className="p-2 border rounded" />
        <input name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} className="p-2 border rounded" />
        <input name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required className="p-2 border rounded" />
        <input name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required className="p-2 border rounded" />
        <input name="totalRooms" placeholder="Total Rooms" value={formData.totalRooms} onChange={handleChange} required className="p-2 border rounded" />
        <input name="availableRooms" placeholder="Available Rooms" value={formData.availableRooms} onChange={handleChange} required className="p-2 border rounded" />
        <input name="pricePerBed" placeholder="Price per Bed (₹)" value={formData.pricePerBed} onChange={handleChange} required className="p-2 border rounded" />
        <input name="depositAmount" placeholder="Deposit Amount (₹)" value={formData.depositAmount} onChange={handleChange} required className="p-2 border rounded" />
        <input name="rating" placeholder="Rating (1-5)" value={formData.rating} onChange={handleChange} className="p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={3} className="p-2 border rounded col-span-1 sm:col-span-2" />

        <select name="pgType" value={formData.pgType} onChange={handleChange} required className="p-2 border rounded">
          <option value="MALE_ONLY" selected>Boys PG</option>
          <option value="FEMALE_ONLY">Girls PG</option>
          <option value="UNISEX">Unisex PG</option>
        </select>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="foodIncluded" checked={formData.foodIncluded} onChange={handleChange} />
          <label>Food Included</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="acAvailable" checked={formData.acAvailable} onChange={handleChange} />
          <label>AC Available</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="wifiAvailable" checked={formData.wifiAvailable} onChange={handleChange} />
          <label>Wi-Fi Available</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="laundryAvailable" checked={formData.laundryAvailable} onChange={handleChange} />
          <label>Laundry Available</label>
        </div>

        <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
          <input type="checkbox" name="verified" checked={formData.verified} onChange={handleChange} />
          <label>Mark as Verified</label>
        </div>

        <button type="submit" className="col-span-1 sm:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit PG
        </button>
      </form>
    </div>
  );
};

export default RegisterPG;
