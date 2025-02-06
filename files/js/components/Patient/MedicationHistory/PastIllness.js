import React, { useState, useEffect } from 'react';
import axios from 'axios';


function PastIllness() {
  const [pastIllnesses, setPastIllnesses]  = useState([]);
  const [editMode, setEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);

  const fetchDataFromApi = async () => {
    try {

      const response = await axios.get('/api/get/pastIllness/history',  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response.data);
      setPastIllnesses(response.data);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  };


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



useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleAddPastIllness = () => {
    const newIllness = { name: '', date: '', editable: true };
    setPastIllnesses([...pastIllnesses, newIllness]);
    setEditMode(true); // Enable edit mode for the newly added illness
  };

  const handleRemovePastIllness = async (index,id) => {

    try {
      const response = await axios.delete(`/api/delete/medicalhistory/${id}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

    } catch (error) {
      console.error('Error fetching health records:', error);
    }
    const updatedIllnesses = [...pastIllnesses];
    updatedIllnesses.splice(index, 1);
    setPastIllnesses(updatedIllnesses);
  };


  const handleInputChange = (event, index, key) => {
    const updatedIllnesses = [...pastIllnesses];
    updatedIllnesses[index][key] = event.target.value;
    setPastIllnesses(updatedIllnesses);
  };



  const handleSave = async (id) => {
    try {

      const data=pastIllnesses[id];

            if (!isValidDate(data['date'])) {
      setError('Please enter a valid date (YYYY-MM-DD).');
                setTimeout(() => {
            setSuccessMessage('');
            setError('');
        }, 2000); 
      return;
    }
      const response = await axios.post('/api/create/history/pastillness', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
      setSuccessMessage("Added successfully");

    const updatedpastIllnesses = pastIllnesses.filter((pastIllnessesdata, index) => index !== id);
    // Add the response data (saved exercise) to the list
    updatedpastIllnesses.push(response.data);

    // Update the exercises state with the modified list
    setPastIllnesses(updatedpastIllnesses);
      

    } 
    catch (error) {
      setError("Failed to Add");
      console.error('Error fetching health records:', error);
    }


    setTimeout(() => {
            setSuccessMessage('');
            setError('');
        }, 2000); 

  };


  return (
    <div className="pastIllnesses-history">
      <h2>Past illness History</h2>
      <form >
        <h3>Past illness:</h3>
        <ul>
          {pastIllnesses.map((illness, index) => (
            <li key={index}>
              <label htmlFor={`name-${index}`}>Name:</label>
              <input
                id={`name-${index}`}
                type="text"
                value={illness.name}
                onChange={(e) => handleInputChange(e, index, 'name')}
                disabled={!illness.editable}
                className={illness.editable ? "editable" : ""}
              />
              <br />
              <label htmlFor={`date-${index}`}>Date:</label>
              <input
                id={`date-${index}`}
                type="text"
                value={illness.date}
                onChange={(e) => handleInputChange(e, index, 'date')}
                disabled={!illness.editable}
                className={illness.editable ? "editable" : ""}
              />
              <label htmlFor={`description-${index}`}>Description:</label>
              <input
                id={`description-${index}`}
                type="text"
                value={illness.description}
                onChange={(e) => handleInputChange(e, index, 'description')}
                disabled={!illness.editable}
                className={illness.editable ? "editable" : ""}
              />
              <button type="button" onClick={() => handleRemovePastIllness(index,illness.id)}>Remove</button>
              {illness.editable &&  <button type="button" onClick={() => handleSave(index)}>Save</button>}
            </li>
          ))}
        </ul>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <button type="button"  style={{"width":"100%" , "marginBottom": "30%"}}  onClick={handleAddPastIllness}>Add</button>
      </form>
    </div>
  );
}

export default PastIllness;
