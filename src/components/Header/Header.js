
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext'; 
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme(); // Using the hook to get theme and toggle function

  return (
    <header className="app-header">
      <div className="header-content container">
        <Link to="/" className="app-logo">
          CareConnect
        </Link>
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li>
              {/* Theme Toggle Button */}
              <button className="theme-toggle-btn" onClick={toggleTheme}>
                {theme === 'light' ? (
                  <span role="img" aria-label="dark mode">🌙 Dark Mode</span>
                ) : (
                  <span role="img" aria-label="light mode">☀️ Light Mode</span>
                )}
              </button>
            </li>
            <li>
              <button className="sign-out-btn" onClick={() => alert('Signing out... (Simulated)')}>Sign Out</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;