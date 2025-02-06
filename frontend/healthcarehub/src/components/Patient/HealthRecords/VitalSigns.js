import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VitalSigns() {
  const [vitalsigns, setvitalsigns] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);

  const fetchVitalSigns = async () => {
    try {


      const response = await axios.get('/api/get/vitalsigns',  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response.data);
      setvitalsigns(response.data);


    } catch (error) {
      console.error('Error fetching health records:', error);
    }
  };


useEffect(() => {
    fetchVitalSigns();
  }, []);


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

  const handleAddVitalSigns = () => {
    const vitalsign = { bloodpressure: '', date: '', editable: true };
    setvitalsigns([...vitalsigns, vitalsign]);
    setEditMode(true); // Enable edit mode for the newly added illness
  };



  const handleRemoveVitalSigns = async (id , vitalId) => {
    try {
      const response = await axios.delete(`/api/delete/vitalsign/${vitalId}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });
    const updatedvitalsign = [...vitalsigns];
    updatedvitalsign.splice(id, 1);
    setvitalsigns(updatedvitalsign);

    } catch (error) {
      console.error('Error fetching health records:', error);
    }

  };



  const handleInputChange = (event, id, key) => {
    const updatedvitalsign = [...vitalsigns];
    updatedvitalsign[id][key] = event.target.value;
    setvitalsigns(updatedvitalsign);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('vitalsigns history:', vitalsigns);
  };

    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = async (id) => {
    try {
      const data=vitalsigns[id];

            if (!isValidDate(data['date'])) {
      setError('Please enter a valid date (YYYY-MM-DD).');
                setTimeout(() => {
            setSuccessMessage('');
            setError('');
        }, 2000); 
      return;
    }
      const response = await axios.post('/api/create/vitalsign', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });


          // Remove the saved exercise from the list
    const updatedvitalsign = vitalsigns.filter((vitalsign, index) => index !== id);
    // Add the response data (saved exercise) to the list
    updatedvitalsign.push(response.data);

    // Update the exercises state with the modified list
    setvitalsigns(updatedvitalsign);
        setSuccessMessage("Added successfully");
    setTimeout(() => {
            setSuccessMessage('');
        }, 2000); 

    } catch (error) {
      console.error('Error fetching health records:', error);
    }




  };

  return (
    <div className="vitalsigns">
      <h2>VitalSigns Tracking</h2>
      <form onSubmit={handleSubmit}>
        <h3>Past VitalSigns records:</h3>
        <ul>
          {vitalsigns.map((vitalsign, id) => (
            <li key={id}>
              <label htmlFor={`bloodpressure-${id}`}>BloodPressure:</label>
              <input
                id={`bloodpressure-${id}`}
                type="text"
                value={vitalsign.bloodpressure}
                onChange={(e) => handleInputChange(e, id, 'bloodpressure')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />

              <br />
              <label htmlFor={`bloodsugar-${id}`}>BloodSugar:</label>
              <input
                id={`bloodsugar-${id}`}
                type="text"
                value={vitalsign.bloodsugar}
                onChange={(e) => handleInputChange(e, id, 'bloodsugar')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />

              <br />
              <label htmlFor={`heartrate-${id}`}>HeartRate:</label>
              <input
                id={`heartrate-${id}`}
                type="text"
                value={vitalsign.heartrate}
                onChange={(e) => handleInputChange(e, id, 'heartrate')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />


              <br />
              <label htmlFor={`date-${id}`}>Date:</label>
              <input
                id={`date-${id}`}
                type="text"
                value={vitalsign.date}
                onChange={(e) => handleInputChange(e, id, 'date')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />

              
              <button type="button" onClick={() => handleRemoveVitalSigns(id,vitalsign.id)}>Remove</button>
              {vitalsign.editable &&  <button type="button" onClick={() => handleSave(id)}>Save</button>}
            </li>
          ))}
        </ul>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <button type="button"  style={{"width":"100%" , "margin-bottom": "30%"}}  onClick={handleAddVitalSigns}>Add</button>
      </form>
    </div>
  );
}

export default VitalSigns;
