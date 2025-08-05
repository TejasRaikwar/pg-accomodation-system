import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav style={{ padding: '1rem', backgroundColor: '#ddd' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/about" style={{ marginRight: '1rem' }}>About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
