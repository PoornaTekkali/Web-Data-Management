// MaintenancePage.js
import React from 'react';
import Navbar from './navbar/Navbar';
import maintenance from '../assets/maintenance.png';
function MaintenancePage() {
  return (
    <div className='container'>

    <div className="login-form" style={{'textAlign': 'left'}}>
    <img src={maintenance} width="150" height="150" alt="Logo"  />
      <h1> Under Maintenance </h1>

      <p style={{"textAlign": "center"}}>Sorry for the inconvenience, but the site is currently undergoing maintenance. Please try again later.</p>
      </div>
    </div>
  );
}

export default MaintenancePage;
