import React, { useState } from 'react';
import './Login.css'; // Import your custom CSS for styling
import Navbar from './../navbar/Navbar'
import { Link } from "react-router-dom";
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';



function LoginPage({settings}) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data= {
        email: email,
        password: password
      };

      const response = await axios.post('/api/auth/admin/user/login', data, { withCredentials: true });
      console.log(response)

      setError(null);
      setSuccessMessage('Loggedin successfully');
      localStorage.setItem('token', response.data.token);
      //localStorage.setItem('name', response.data.name); 
      localStorage.setItem('role', response.data.role); 
       setTimeout(() => {
            console.log("navigating to / page")

            navigate('/admin');
            //console.log("refreshing page")
            window.location.reload();

          }, 1000); 
  


    } catch (error) {
      
      console.log(error)
      if (error.response.status==403 && error.response) {
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
      <div className="admin-login-form">
        <h1>Admin Login</h1>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>}</div>        <div className="form-group">
          <label htmlFor="email">Email</label>
          <br/>
          <input
            type="text"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="admin-form-group">
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="form-links">
          <Link to='/forgotpassword'>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
