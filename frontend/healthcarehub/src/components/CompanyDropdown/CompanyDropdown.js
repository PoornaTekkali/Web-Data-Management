import React, { useState } from 'react';

import { Link } from "react-router-dom";
import './CompanyDropdown.css'

function CompanyDropdown({ isInitiallyOpen = false, ...otherProps }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(isInitiallyOpen);

  const handleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="company-dropdown">
      {isDropDownOpen ? (
        <button onClick={handleDropDown} {...otherProps}>
          Company <i className="fas fa-caret-up" />
        </button>
      ) : (
        <button onClick={handleDropDown} {...otherProps}>
          Company <i className="fas fa-caret-down" />
        </button>
      )}
      {isDropDownOpen && (
        <div className="medical-record-drop-down">
          <Link to="/services">Services</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/about-us">About Us</Link>
        </div>
      )}
    </div>
  );
}

export default CompanyDropdown;