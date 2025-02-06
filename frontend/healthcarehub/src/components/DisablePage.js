// DisablePage.js
import React from 'react';
import Navbar from './navbar/Navbar';
import Error404 from '../assets/ban-user.png';
function DisablePage({name,settings}) {
  return (
    <div className='container'>
    <Navbar settings={settings}/>

    <div className="login-form" style={{'text-align': 'left'}}>
    <img src={Error404} width="150" height="150" alt="Logo" a />
      <h1> {name} is  not Available</h1>

      <p style={{"text-align": "center"}}>{name} has been disabled by your Administrator.</p>
      </div>
    </div>
  );
}

export default DisablePage;
