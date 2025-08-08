import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    fullName: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/api/users/${user.userid}`)
      .then(res => {
        setForm({
          username: res.data.username || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          fullName: res.data.fullName || ""
        });
      })
      .catch(() => toast.error("Failed to fetch profile"))
      .finally(() => setLoading(false));
  }, [user.userid]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put(`/api/users/${user.userid}`, form);
      toast.success("Profile updated successfully");
      setUser(res.data);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input name="username" value={form.username} onChange={handleChange} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="border rounded px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
