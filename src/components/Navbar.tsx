import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Star Wars Hub</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li><Link to="/characters">Characters</Link></li> */}
      </ul>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;