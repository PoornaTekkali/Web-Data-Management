import React from 'react';
import './Footer.css'; // Import the CSS file

function Footer() {
  return (
    <footer>
      <div style={{'width': '100px' }}><h3>Contact us </h3></div>
      <ul>
        <li>Email: example@example.com</li>
        <li>Phone: 123-456-7890</li>
        <li>Address: 123 Main Street, Silicon Valley , United States </li>
      </ul>
      <div className="social-icons">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
    </footer>
  );
}

export default Footer;
