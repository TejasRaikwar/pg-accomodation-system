import { Link, Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-800 text-white p-8 flex flex-col justify-between shadow-lg">
        <div>
          <nav className="flex flex-col gap-4">
            <Link to="/owner/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <span>📊</span> <span>Dashboard</span>
            </Link>
            <Link to="/owner/register-pg" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <span>➕</span> <span>Register PG</span>
            </Link>
            <Link to="/owner/pg-list" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <span>📄</span> <span>View PG Listings</span>
            </Link>
            <Link to="/owner/tenants" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <span className="text-lg">👥</span> <span>Your Tenants</span>
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-sm text-blue-200 text-center">
          &copy; {new Date().getFullYear()} PG Accommodation Owner
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-8 rounded-l-3xl shadow-xl">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;