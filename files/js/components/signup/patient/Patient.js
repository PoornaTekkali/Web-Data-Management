// DoctorComponent.js
//import React from 'react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './Patient.css';
import { Link } from "react-router-dom";
import { useHistory, useNavigate } from 'react-router-dom';

function PatientSignup(props) {

  const [dateofbirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [emergencycontactnumber, setEmergencyContactNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setlocation] = useState();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');



  const [error, setError] = useState(null);

 function isValidDate(dateString) {
  // Check if the input string matches the expected date format (YYYY-MM-DD)
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  // Parse the date components
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  // Validate year, month, and day ranges
  const isValidYear = year >= 1 && year <= 9999;
  const isValidMonth = month >= 1 && month <= 12;
  const isValidDay = day >= 1 && day <= 31;

  return isValidYear && isValidMonth && isValidDay;
}




  const handleSubmit = async () => {
    if (!isValidDate(dateofbirth)) {
      setError('Please enter a valid date (YYYY-MM-DD).');
      return;
    }
    if (!dateofbirth || !gender || !location ||!phoneNumber ) {
      setError('Please fill out the required fields.');
      return;
    }

    const data= {
    email : props.email ,
    password : props.password ,
    firstname: props.firstname ,
    lastname : props.lastname ,
    phoneNumber : phoneNumber,
    dateofbirth: dateofbirth,
    gender: gender,
    emergencycontactnumber: emergencycontactnumber,
    address: location
    }
    console.log(data)
    
    try {
      const response = await axios.post('/api/create/user/patient' , data);
      setError(null);
      setSuccessMessage('Account Created Successfully');
      setTimeout(() => {        
            navigate('/login');

          }, 2000);
    }

    catch (error) {
      
        console.log(error)
        setError('ERROR: Somethig went wrong');
    }

  };


  return (
    <div className="patient-container">
      <div className="details-form">
        <h1>User Details</h1>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>}</div>
        <div className="form-group">
          <label htmlFor="dateofbirth">Date of Birth *</label>
          <input
            type="text"
            id="dateofbirth"
            placeholder="YYYY-MM-DD"
            value={dateofbirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className={!isValidDate(dateofbirth) ? 'invalid' : ''}
          />
          
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            value={gender}
            onChange={e => setGender(e.target.value)}
            >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
            <label htmlFor="location">Address *</label>
            <input
              type="text"
              id="location"
              placeholder="Dallas US "
              value={location}
              onChange={e => setlocation(e.target.value)}
              required
            />
          </div>

        <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="+1 408480XXXX"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              required
            />
          </div>

        
        <div className="form-group">
          <label htmlFor="Emergency Contact Number">Emergency Contact Number</label>
          <input
            type="text"
            id="emergencycontactnumber"
            placeholder="+1 408480XXXX"
            value={emergencycontactnumber}
            onChange={e => setEmergencyContactNumber(e.target.value)}
          />
        </div>




        <button onClick={handleSubmit}>Submit</button>
        <div className="form-links">
          <span>Already have an account? </span>
          <Link to='/login'>  Login </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientSignup;
