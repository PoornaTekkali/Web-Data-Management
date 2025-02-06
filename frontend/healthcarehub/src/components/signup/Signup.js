import React, { useState } from 'react';
import './SignUp.css'; // Import your custom CSS for styling
import Patient from './patient/Patient'
import Doctor from './doctor/Doctor'
import Pharmacist from './pharmacist/Pharmacist'
import Navbar from './../navbar/Navbar'
import { Link } from "react-router-dom";


function SignUpPage({settings}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPharmacist, setIsPharmacist] = useState(false);
  const [nextClicked, setNextClicked] = useState(false)
  const [error, setError] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);



  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if the passwords match whenever the confirm password field changes
    setPasswordsMatch(e.target.value === password);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if the passwords match whenever the confirm password field changes
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleToggleDoctor = () => {
    setIsDoctor(!isDoctor);
    setIsPharmacist(false); // Uncheck pharmacist if doctor is checked
  };

  const handleTogglePharmacist = () => {
    setIsPharmacist(!isPharmacist);
    setIsDoctor(false); // Uncheck doctor if pharmacist is checked
  };


  const handleSignupNext = () => {

    if (!email || !firstname || !lastname ||!password ) {
      setError('Please fill out the required fields.');
      return;
    }
    
    setNextClicked(true);


    
  };

  return (
    <div className="container">
    <Navbar settings={settings}/>
      {!nextClicked && (
        <div className="signup-form">
          <h1>Sign Up</h1>
          <div>{error && <p className="error-message">{error}</p>}</div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstname">First Name *</label>
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {!passwordsMatch && <p className="error-message">Passwords do not match</p>}
          </div>
          

          
          <div className="form-group">
            
            <div className="toggle">
              <input
                type="checkbox"
                id="isDoctor"
                checked={isDoctor}
                onChange={handleToggleDoctor}
              />
              <div className="slider round" onClick={handleToggleDoctor}></div>
            </div>
            <label htmlFor="isDoctor">  Are you a Doctor ? </label>
          </div>
          
          <div className="form-group">
            <div className="toggle">
              <input
                type="checkbox"
                id="isPharmacist"
                checked={isPharmacist}
                onChange={handleTogglePharmacist}
              />
              <div className="slider round" onClick={handleTogglePharmacist}></div>
            </div>
            <label htmlFor="isPharmacist">  Are you a Pharmacist ? </label>
          </div>


          {passwordsMatch && <button onClick={handleSignupNext}>Next</button> }


          <div className="form-links">
            <span>Already have an account? </span>
            <Link to='/login'>  Login </Link>
          </div>
        </div>
    )}
      {nextClicked && !isDoctor && !isPharmacist && <Patient 
        email={email} 
        password={password}
        confirmPassword={confirmPassword} 
        firstname={firstname} 
        lastname={lastname} 
        />}

        {nextClicked && isDoctor && !isPharmacist && <Doctor 
        email={email} 
        password={password}
        confirmPassword={confirmPassword} 
        firstname={firstname} 
        lastname={lastname}
        />}

        {nextClicked && !isDoctor && isPharmacist && <Pharmacist 
        email={email} 
        password={password}
        confirmPassword={confirmPassword} 
        firstname={firstname} 
        lastname={lastname}
        />}

    </div>
      
    
  );
}

export default SignUpPage;
