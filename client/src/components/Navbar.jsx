import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Site Name */}
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-200">
          PG Accommodations
        </Link>
      </div>

      {/* Right: Navigation Links */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {user.userType === "ADMIN" && (
              <Link to="/admin/dashboard" className="hover:text-gray-200">
                Admin
              </Link>
            )}
            {user.userType === "OWNER" && (
              <Link to="/owner/dashboard" className="hover:text-gray-200">
                Owner
              </Link>
            )}
            {user.userType === "TENANT" && (
              <Link to="/tenant/dashboard" className="hover:text-gray-200">
                Tenant
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
