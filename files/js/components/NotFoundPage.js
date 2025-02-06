// NotFoundPage.js
import React from 'react';
import Navbar from './navbar/Navbar';
import Error404 from '../assets/error.png';
function NotFoundPage({settings}) {
  return (
    <div className='container'>
    <Navbar settings={settings}/>

    <div className="login-form" style={{'text-align': 'left'}}>
    <img src={Error404} width="150" height="150" alt="Logo" a />
      <h1>404 - Page Not Found</h1>

      <p style={{"text-align": "center"}}>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
