import React, { useState, useEffect } from 'react';
import './BasicHealthRecord.css'; //
import Navbar from '../../navbar/Navbar';

function HealthRecords() {
  const [healthRecords, setHealthRecords] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedHealthRecords, setEditedHealthRecords] = useState({});

  // Sample function to fetch health records from an API
  const fetchHealthRecords = async () => {
    try {
      // Make API call to fetch health records
      // Replace the URL with your actual API endpoint
      // const response = await fetch('your-api-endpoint');
      // const data = await response.json();
      // Update state with fetched health records
      const sampleHealthRecords = {
        height: '175 cm',
        weight: '70 kg',
        age: '30 years',
        bloodGroup: 'A+',
        // Add more health records as needed
      };
      const data=sampleHealthRecords;
      setHealthRecords(data);
      setEditedHealthRecords(data); // Set initial values for editable fields
    } catch (error) {
      console.error('Error fetching health records:', error);
    }
  };

  useEffect(() => {
    // Fetch health records when the component mounts
    fetchHealthRecords();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data or make API call to update health records
    // After successful update, setEditMode to false
    setEditMode(false);
    // Here, you can use editedHealthRecords to update the health records
    console.log('Edited health records:', editedHealthRecords);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedHealthRecords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="health-records">
      <h2>Health Records</h2>
      {healthRecords ? (
        <div>
          <form method="POST">


          <div className="input-row"> 
            <div>
              <label htmlFor="height">Height:</label>
              <input
                type="text"
                id="height"
                name="height"
                value={editMode ? editedHealthRecords.height : healthRecords.height}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            
            <div>
              <label htmlFor="weight">Weight:</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={editMode ? editedHealthRecords.weight : healthRecords.weight}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
            </div>

            <div className="input-row"> 
            
            <div>
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={editMode ? editedHealthRecords.age : healthRecords.age}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>




            <div>
              <label htmlFor="bloodGroup">Blood Group:</label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={editMode ? editedHealthRecords.bloodGroup : healthRecords.bloodGroup}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

             </div>


            {editMode && <button onClick={handleCancel}>Cancel</button>}
            {editMode && <button type="submit" onClick={handleSubmit}>Save</button>}
          </form>
          
          {!editMode && <button onClick={handleEdit}>Edit</button>}
        </div>
      ) : (
        <p>Loading health records...</p>
      )}
    </div>
  );
}

export default HealthRecords;
