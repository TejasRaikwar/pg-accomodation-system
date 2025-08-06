import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Login and get token
      const res = await api.post("/api/auth/login", formData);
      const token = res.data.token;

      // 2. Fetch user info
      const userRes = await api.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = userRes.data;

      // 3. Save token and user in context/localStorage
      login(token, userData);

      // 4. Redirect based on role
      const role = userData.userType;
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "OWNER") navigate("/owner/dashboard");
      else if (role === "TENANT") navigate("/tenant/dashboard");
      else navigate("/");

    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
