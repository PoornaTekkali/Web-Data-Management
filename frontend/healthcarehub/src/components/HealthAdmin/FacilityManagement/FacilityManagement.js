import React, { useState, useEffect, useDeferredValue} from 'react';
import './FacilityManagement.css'; // Import your CSS file for HealthForums styling
import Navbar from '../../navbar/Navbar';
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';




const HealthForum = () => {
  const [Facilities, setFacilities] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');
  const [creatnew , setCreateNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    services:'',
    status: 'Active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };



  const [nameFilter, setNameFilter] = useState('');


    const fetchDataFromApi = async () => {
      try {
      const response = await axios.get(`/api/get/facilities`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      return response.data;
    }
    catch (error) { 
      console.log(error)
        setError('ERROR: Somethig went wrong');
  }
      
  };


  const Search = async () => {
    try {
      const response = await axios.get(`/api/search/facility?name=${nameFilter}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      setFacilities(response.data);
  }
  catch (error) { 
      console.log(error)
        setError('ERROR: Somethig went wrong');
  }
      
};


  const CreateNew = () => { 
    setCreateNew(!creatnew);

  }

    const handleSubmit = async() => {
    try {
    const response = await axios.post('/api/create/facility', formData,  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });;
    setSuccessMessage("Reported  successfully");
    setTimeout(() => {
            setSuccessMessage('');
            setFormData({
    name: '',
    description: '',
    location: '',
    services:'',
    status: '',
  });
    }, 5000); 

    const updatedFacilities = [...Facilities, response.data];
    setFacilities(updatedFacilities);
    setCreateNew(!creatnew);
    
  }
  catch (error) { 
      console.log(error)
        setError('ERROR: Somethig went wrong');
  }
      
};




useEffect(() => {
        const fetchData = async () => {
            const facilities = await fetchDataFromApi();
            console.log(facilities)
            setFacilities(facilities);
        };
        fetchData();
}, []);



  return (
    <div className="facilitymanagement">
      
      {!creatnew &&  
      <div>
      <h1 className="facilitymanagement-heading">Facility Management </h1>
      <div className="facilitymanagement-filter-container">

        <input
          type="text"
          placeholder="Search"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
        />
        <button onClick={Search}> Search  </button>
        <button onClick={CreateNew}> Create  </button>
        
      </div>
      </div>
      }
      {!creatnew &&  
      <div className="facilitymanagement-list">
      <div>{error && <p className="error-message">{error}</p>}</div>

        {Facilities.map(facility => (
          <div href='' key={facility.id} className="facilitymanagement-card" >
            <div className="left-section">
              <div style={{ paddingLeft: '20px' }}>
                <h2>{facility.name} </h2>
                <p>Location:{facility.location}</p>
                <p>Services Offered: {facility.services} </p>
                <p>Status: {facility.status} </p>
                <p className="facilitymanagement-description">{facility.description}</p>
              </div>
            </div>
          </div>
        
        ))}
    </div>

  }
  {creatnew &&  
      <div className="facilitymanagement-list">
      <div className="forum-form healthforum-form" style={{"maxWidth":"800px"}}>
      <h1>Create New Facility</h1>
        


      <label>Name *</label><br/>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

      <label>Location *</label><br/>
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />


      <label>Services *</label><br/>
            <input type="text" name="services" value={formData.services} onChange={handleInputChange} required />

      <label> Status*</label> <br/>
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>

      <label>Description *</label>
        <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={8} // Set the number of visible rows
          />

      <button onClick={CreateNew}>Close</button>
      <button onClick={handleSubmit}>Submit</button>

      </div>
    </div>
  }
  </div>
  );
};

export default HealthForum;