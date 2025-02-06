import './Login.css'; // Import your custom CSS for styling
import Navbar from './../navbar/Navbar'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory, useNavigate } from 'react-router-dom';
import LoginNotification from './../LoginNotification'
import React, { useState, useEffect } from 'react';


function LoginPage({settings}) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  


  const handleLogin = async () => {
    try {
      const data= {
        email: email,
        password: password
      };

      const response = await axios.post('/api/auth/user/login', data, { withCredentials: true });
      console.log(response)

      setError(null);
      setSuccessMessage('Loggedin successfully');
      localStorage.setItem('role', response.data.role); 
      localStorage.setItem('token', response.data.token);
      
       setTimeout(() => {
            console.log("navigating to / page")

            navigate('/');
            //console.log("refreshing page")
            window.location.reload();

          }, 1000); 
  



    } catch (error) {
      
      console.log(error)
      if (error.response && error.response.status==403 ) {
        setSuccessMessage(null);
        setError(error.response.data.error);
      }
      else if (error.response) {
        setSuccessMessage(null);
        setError("wrong username and password");
      }
       else if (error.request) {
        setSuccessMessage(null);
        setError('ERROR: Somethig went wrong');
      } else {
        setSuccessMessage(null);
        setError('ERROR: Somethig went wrong');
      }
    }
};



  return (
    <div className="container">
    <Navbar settings={settings}/>
      <div className="login-form">
        <h1>Login</h1>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>}</div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={e => setemail(e.target.value)}
            onKeyDown={e => {
            if (e.key === 'Enter') {
              handleLogin();
          }
        }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <div className="password-input">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
            if (e.key === 'Enter') {
              handleLogin();
          }
        }}
            />
          </div>
        </div>
        <div className="form-group">
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="form-links">
        <Link to='/forgotpassword'>
            Forgot Password?
          </Link>
          <span className="separator">|</span>
          <Link to='/signup'>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
