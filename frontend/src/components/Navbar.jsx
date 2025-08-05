import { Link } from "react-router-dom";
import "./Navbar.css"
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar-main">
            <div><Link to="/" className="site-name-link site-name">PG Accommodations</Link></div>
            <div className="navbar-login-register">
                {user ? (
                    <>
                        {user.userType === "ADMIN" && <Link to="/admin/dashboard" className="site-name-link">Admin</Link>}
                        {user.userType === "OWNER" && <Link to="/owner/dashboard" className="site-name-link">Owner</Link>}
                        {user.userType === "TENANT" && <Link to="/tenant/dashboard" className="site-name-link">Tenant</Link>}
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="site-name-link">Login</Link> | <Link to="/register" className="site-name-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;


/*


    <nav>
          <Link to="/">PG Accommodations</Link>
      {user ? (
        <>
          {user.userType === "ADMIN" && <Link to="/admin/dashboard">Admin</Link>}
          {user.userType === "OWNER" && <Link to="/owner/dashboard">Owner</Link>}
          {user.userType === "TENANT" && <Link to="/tenant/dashboard">Tenant</Link>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>


*/