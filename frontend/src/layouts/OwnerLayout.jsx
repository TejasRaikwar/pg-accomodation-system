import { Link, Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <>
      <nav style={{ background: "#ddd", padding: "1rem" }}>
        <span style={{ fontWeight: "bold" }}>Owner Panel</span>{" | "}
        <Link to="/owner">Dashboard</Link>{" | "}
        <Link to="/owner/pgs">My PGs</Link>{" | "}
        <Link to="/owner/tenants">Tenants</Link>{" | "}
        <Link to="/">Logout</Link>
      </nav>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
};

export default OwnerLayout;
