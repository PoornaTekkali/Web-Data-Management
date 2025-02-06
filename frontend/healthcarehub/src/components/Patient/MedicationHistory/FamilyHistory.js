import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FamilyHistory() {
  const [familyhistory, setfamilyhistory]  = useState([]);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);



    const fetchFamilyHistory = async () => {
    try {

      const response = await axios.get('/api/get/familyhealth/history',  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response.data);
      setfamilyhistory(response.data);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  };


useEffect(() => {
    fetchFamilyHistory();
  }, []);




  const handleAddfamilyhistory = () => {
    const newfamilyhistory = { name: '', date: '', editable: true };
    setfamilyhistory([...familyhistory, newfamilyhistory]);
    setEditMode(true); 
  };

  const handleRemovefamilyhistory  = async (index,id) => {

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

    const updatedfamilyhistory = [...familyhistory];
    updatedfamilyhistory.splice(index, 1);
    setfamilyhistory(updatedfamilyhistory);
  };

  const handleInputChange = (event, index, key) => {
    const updatedfamilyhistory = [...familyhistory];
    updatedfamilyhistory[index][key] = event.target.value;
    setfamilyhistory(updatedfamilyhistory);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('familyhistory :', familyhistory);
  };
    

  const handleSave = async (id) => {
    try {
      console.log(id)
      console.log(familyhistory)
      const data=familyhistory[id];
      console.log(data)
      const response = await axios.post('/api/create/history/FamilyHealth', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
      


    // Remove the saved exercise from the list
    const updatedfamilyhistory = familyhistory.filter((familyhistorydata, index) => index !== id);
    // Add the response data (saved exercise) to the list
    updatedfamilyhistory.push(response.data);

    // Update the exercises state with the modified list
    setfamilyhistory(updatedfamilyhistory);
    setSuccessMessage("Added successfully");
      

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
    <div className="family-history">
      <h2>Family Health History</h2>
      <form onSubmit={handleSubmit}>
        <h3>FamilyHistory:</h3>
        <ul>
          {familyhistory.map((history, index) => (
            <li key={index}>
              <label htmlFor={`name-${index}`}>Title:</label>
              <input
                id={`name-${index}`}
                type="text"
                value={history.name}
                onChange={(e) => handleInputChange(e, index, 'name')}
                disabled={!history.editable}
                className={history.editable ? "editable" : ""}
              />
              <br />
              <label htmlFor={`description-${index}`}>Description:</label>
              <input
                id={`description-${index}`}
                type="text"
                value={history.description}
                onChange={(e) => handleInputChange(e, index, 'description')}
                disabled={!history.editable}
                className={history.editable ? "editable" : ""}
              />
              <button type="button" onClick={() => handleRemovefamilyhistory(index,history.id)}>Remove</button>
              {history.editable &&  <button type="button" onClick={() => handleSave(index)}>Save</button>}
            </li>
          ))}
        </ul>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <button type="button"  style={{"width":"100%" , "margin-bottom": "30%"}}  onClick={handleAddfamilyhistory}>Add</button>
      </form>
    </div>
  );
}

export default FamilyHistory;
