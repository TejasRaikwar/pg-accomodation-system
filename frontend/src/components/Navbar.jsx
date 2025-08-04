import React from 'react'

const Navbar = () => {
    return (
        <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
            <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
            <Link to="/about" style={{ marginRight: '1rem' }}>About</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    )
}

export default Navbar