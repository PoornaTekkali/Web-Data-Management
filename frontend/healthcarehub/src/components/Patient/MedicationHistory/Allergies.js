import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Allergies() {
  const [allergies, setallergies] = useState([]);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);


  const fetchDataFromApi = async () => {
    try {

      const response = await axios.get('/api/get/allergies/history',  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response.data);
      setallergies(response.data);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  };


useEffect(() => {
    fetchDataFromApi();
  }, []);


  const handleAddallergies = () => {
    const newallergies = { name: '', date: '', editable: true };
    setallergies([...allergies, newallergies]);
    setEditMode(true); 
  };

  const handleRemoveallergies = (index) => {
    const updatedallergies = [...allergies];
    updatedallergies.splice(index, 1);
    setallergies(updatedallergies);
  };

  const handleInputChange = (event, index, key) => {
    const updatedallergies = [...allergies];
    updatedallergies[index][key] = event.target.value;
    setallergies(updatedallergies);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('allergies :', allergies);
  };

  const handleSave = async (id) => {
    try {

      const data={allergies: allergies}
      const response = await axios.post('/api/create/history/allergies', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
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
    <div className="allergies">
      <h2>Allergies</h2>
      <form onSubmit={handleSubmit}>
        <h3>Allergies:</h3>
        <ul>
          {allergies.map((allergy, index) => (
            <li key={index}>
              
              <input
                id={`name-${index}`}
                type="text"
                value={allergy.name}
                onChange={(e) => handleInputChange(e, index, 'name')}
                disabled={!allergy.editable}
                className={allergy.editable ? "editable" : ""}
              />
              <button type="button" style={{ "marginLeft": "5%" }} onClick={() => handleRemoveallergies(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button type="button" style={{"width":"100%"}} onClick={handleAddallergies}>Add</button>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <button type="submit" onClick={handleSave}>Submit</button>
      </form>
    </div>
  );
}

export default Allergies;
