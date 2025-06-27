import React from 'react';
import './Footer.css'; // Create this CSS file

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content container">
        <p>&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</p>
        <p>Designed with care for BlueStep Systems.</p>
      </div>
    </footer>
  );
};

export default Footer;