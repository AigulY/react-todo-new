import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-todo">Todo List</Link>
            <ul className={`nav-links ${isActive ? "active" : ""}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/new">New</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="hamburger-menu" onClick={() => setIsActive(!isActive)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </nav>
    );
};

export default Navbar;
