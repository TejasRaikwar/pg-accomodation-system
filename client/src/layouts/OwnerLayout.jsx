import { Link, Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Owner Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/owner/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/owner/register-pg" className="hover:text-gray-300">➕ Register PG</Link>
          <Link to="/owner/pg-list" className="hover:text-gray-300">📄 View PG Listings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;










// import { Link, Outlet } from "react-router-dom";

// const OwnerLayout = () => {
//   return (
//     <>
//       <nav style={{ background: "#ddd", padding: "1rem" }}>
//         <span style={{ fontWeight: "bold" }}>Owner Panel</span>{" | "}
//         <Link to="/owner">Dashboard</Link>{" | "}
//         <Link to="/owner/pgs">My PGs</Link>{" | "}
//         <Link to="/owner/tenants">Tenants</Link>{" | "}
//         <Link to="/">Logout</Link>
//       </nav>
//       <main style={{ padding: "1rem" }}>
//         <Outlet />
//       </main>
//     </>
//   );
// };

// export default OwnerLayout;
