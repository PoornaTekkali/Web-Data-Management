// Pharmacist.js
//import React from 'react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Pharmacist.css';
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";


function Pharmacist(props) {

  const [qualification, setQualification]= useState('');
  const [licensenumber, setLicenseNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setlocation] = useState();
  const navigate = useNavigate();


  const [healthfacilityname, setHealthFacilityName] = useState('');
  const [healthfacilitynameoptions, setHealthFacilityNameOptions] = useState([]);
  
  const [about, setAbout] = useState('');
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');




  const fetchFacilitiesFromApi = async () => {
      const response = await axios.get(`/api/get/facilities`)
      return response.data;
  };

  // Function to fetch primary care provider options from API
  const fetchHealthFacilityName = async (inputValue) => {
    try {
      // Perform API call to fetch primary care providers based on inputValue
      //const data = await response.json();
      const data= await fetchFacilitiesFromApi()
      console.log(data)

      // Transform API response data to the format expected by React Select
      const transformedOptions = data.map((provider) => ({
        value: provider.id,
        label: provider.name,
      }));
      setHealthFacilityNameOptions(transformedOptions);
    } catch (error) {
      console.error('Error fetching primary care providers:', error);
    }
  };
  useEffect(() => {
    // Fetch doctors from API when the component mounts
    fetchHealthFacilityName();
  }, []);


  const handleHealthFacilityChange = (selectedOption) => {
    setHealthFacilityName(selectedOption);
  };

  const handleSubmit = async () => {

    if (!qualification || !licensenumber || !about || !healthfacilityname || !location ||!phoneNumber ) {
      setError('Please fill out the required fields.');
      return;
    }
    const data= {
      email : props.email ,
      password : props.password ,
      firstname: props.firstname ,
      lastname : props.lastname ,
      phoneNumber : phoneNumber,
      qualification:qualification,
      licensenumber:licensenumber,
      facility_id: healthfacilityname.value,
      about: about,
      address: location
      }
      console.log(data)
    
    try {
      const response = await axios.post('/api/create/user/pharmacist' , data);
      setError(null);
      setSuccessMessage('Account Created Successfully');
      setTimeout(() => {
            navigate('/login');
          }, 2000);
    }


    catch (error) {
      
        console.log(error)
        setSuccessMessage(null);
        setError('ERROR: Somethig went wrong');
    }

};


  return (
    <div className="pharmacist-container">
      <div className="details-form">
        <h1>Pharmacist Details</h1>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>}</div>
        

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
          <label htmlFor="Qualification">Qualification *</label>
          <input
            type="text"
            id="qualification"
            placeholder="MBBS MD Masters"
            value={qualification}
            onChange={e => setQualification(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="License Number">License Number *</label>
          <input
            type="text"
            id="licensenumber"
            placeholder="XXXXXXXXX"
            value={licensenumber}
            onChange={e => setLicenseNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="about">About *</label>
          <textarea
            id="about"
            value={about}
            onChange={e => setAbout(e.target.value)}
            placeholder="Explain YourSelf in few sentences..."
            rows={3} // Set the number of visible rows
          />
        </div>

        <div className="form-group">
          <label htmlFor="healthfacilityname">Health Facility Name *</label>
          <Select
            id="healthfacilityname"
            value={healthfacilityname}
            onChange={handleHealthFacilityChange}
            options={healthfacilitynameoptions}
            placeholder="Search or select Health Facility"
            isSearchable
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

export default Pharmacist;
