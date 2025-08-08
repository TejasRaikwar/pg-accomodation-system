import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "", userType: "" });
  const [sortField, setSortField] = useState("userid");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    api.get("/api/users")
      .then(res => setUsers(res.data))
      .catch(() => toast.error("Failed to fetch users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/api/users/${id}`);
      toast.success("User deleted successfully");
      setUsers(users.filter(u => u.userid !== id));
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      fullName: user.fullName || "",
      userType: user.userType,
      isActive: user.isActive,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api/users/${editUser.userid}`, { ...editUser, ...editForm });
      toast.success("User updated successfully");
      setUsers(users.map(u => u.userid === editUser.userid ? res.data : u));
      setEditUser(null);
    } catch {
      toast.error("Failed to update user");
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="user-search" className="font-medium text-gray-700">Search:</label>
        <input
          id="user-search"
          type="text"
          className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Type username, email, phone, full name, or role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort("userid")}>ID {sortField === "userid" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
              <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort("username")}>Username {sortField === "username" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
              <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort("email")}>Email {sortField === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
              <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort("phone")}>Phone {sortField === "phone" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
              <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort("userType")}>Role {sortField === "userType" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
              <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort("fullName")}>Full Name {sortField === "fullName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
              <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort("isActive")}>Active {sortField === "isActive" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...users]
              .filter(u => {
                const q = search.trim().toLowerCase();
                if (!q) return true;
                return (
                  u.username?.toLowerCase().includes(q) ||
                  u.email?.toLowerCase().includes(q) ||
                  u.phone?.toLowerCase().includes(q) ||
                  u.fullName?.toLowerCase().includes(q) ||
                  u.userType?.toLowerCase().includes(q)
                );
              })
              .sort((a, b) => {
                let valA = a[sortField];
                let valB = b[sortField];
                if (valA == null) valA = "";
                if (valB == null) valB = "";
                if (typeof valA === "string") valA = valA.toLowerCase();
                if (typeof valB === "string") valB = valB.toLowerCase();
                if (valA < valB) return sortOrder === "asc" ? -1 : 1;
                if (valA > valB) return sortOrder === "asc" ? 1 : -1;
                return 0;
              })
              .map(u => (
                <tr key={u.userid}>
                  <td className="border px-2 py-1">{u.userid}</td>
                  <td className="border px-2 py-1">{u.username}</td>
                  <td className="border px-2 py-1">{u.email}</td>
                  <td className="border px-2 py-1">{u.phone}</td>
                  <td className="border px-2 py-1">{u.userType}</td>
                  <td className="border px-2 py-1">{u.fullName}</td>
                  <td className="border px-2 py-1">{u.isActive ? "Yes" : "No"}</td>
                  <td className="border px-2 py-1">
                    <button className="text-blue-600 mr-2" onClick={() => handleEdit(u)}>Edit</button>
                    <button className="text-red-600" onClick={() => handleDelete(u.userid)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-medium mb-1">Username</label>
                <input name="username" value={editForm.username} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input name="email" value={editForm.email} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <input name="phone" value={editForm.phone || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input name="fullName" value={editForm.fullName || ""} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Role</label>
                <select name="userType" value={editForm.userType} onChange={handleEditChange} className="border rounded px-2 py-1 w-full">
                  <option value="ADMIN">ADMIN</option>
                  <option value="OWNER">OWNER</option>
                  <option value="TENANT">TENANT</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Active</label>
                <select name="isActive" value={editForm.isActive ? "true" : "false"} onChange={e => setEditForm(f => ({ ...f, isActive: e.target.value === "true" }))} className="border rounded px-2 py-1 w-full">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditUser(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;