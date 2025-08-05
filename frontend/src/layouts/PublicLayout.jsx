import { Link, Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <header style={{ padding: "1rem", background: "#eee" }}>
        <Link to="/" style={{ fontWeight: "bold", marginRight: "2rem" }}>🏠 PG System</Link>
        <Link to="/">Home</Link>{" | "}
        <Link to="/login">Login</Link>{" | "}
        <Link to="/signup">Signup</Link>
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>

      <footer style={{ padding: "1rem", background: "#eee", marginTop: "2rem" }}>
        &copy; 2025 PG Accommodation System
      </footer>
    </>
  );
};

export default PublicLayout;
