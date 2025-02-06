import React, { useState, useEffect } from 'react';
import Navbar from '../../navbar/Navbar';
import axios from 'axios';

function HealthRecords() {
  const [healthRecords, setHealthRecords] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedHealthRecords, setEditedHealthRecords] = useState({});
  const token = localStorage.getItem('token');

  const fetchHealthRecords = async () => {
    try {


      const response = await axios.get('/api/get/basic/healthrecord',  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response)
      if(response.data.length==0){
        const healthRecord={
          "height":'',
          'blood_group':'',
          'age':'',
          'weight':''

        }
        setHealthRecords(healthRecord);
        setEditedHealthRecords(healthRecord);
      }
      else{
        console.log(response.data[0]);
        setHealthRecords(response.data[0]);
        setEditedHealthRecords(response.data[0]);
      }


    } catch (error) {
      console.error('Error fetching health records:', error);
    }
  };

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedHealthRecords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async () => {

    try {
    const response = await axios.post('/api/update/basic/healthrecord', editedHealthRecords,  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
      });;
      setHealthRecords(response.data);
      setEditedHealthRecords(response.data);
    setEditMode(false);
    setSuccessMessage("Edited successfully");
    setTimeout(() => {
            setSuccessMessage('');
        }, 2000); 
  }catch (error) {
      console.error('Error fetching health records:', error);
    }
  

  };

  return (
    <div className="health-records">
      <h2>Health Records</h2>
      <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
      {healthRecords ? (
        <div>


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
                name="blood_group"
                value={editMode ? editedHealthRecords.blood_group : healthRecords.blood_group}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

             </div>


            {editMode && <button onClick={handleCancel}>Cancel</button>}
            {editMode && <button type="submit" onClick={handleSubmit}>Save</button>}
          
          {!editMode && <button onClick={handleEdit}>Edit</button>}
        </div>
      ) : (
        <p>Loading health records...</p>
      )}
    </div>
  );
}

export default HealthRecords;
