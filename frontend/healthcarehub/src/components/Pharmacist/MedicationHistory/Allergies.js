import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Allergies.css'
import SearchPatient from './../../SearchPatient'

function Allergies() {
  const [allergies, setallergies] = useState([]);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);


  const fetchDataFromApi = async (name) => {
    try {

      const response = await axios.get(`/api/get/shared/medical/history?type=ALLERGIES&&name=${name}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

  const allergiesArray = response.data;

  // Define an array to hold patient data
  const patientsData = [];

  // Iterate over each patient's data
  allergiesArray.forEach(patientAllergies => {
      // Split the description into an array of allergy names
      const allergyNames = patientAllergies.description.split(',').map(allergyName => allergyName.trim());

      // Create an array of objects representing each allergy for the current patient
      const allergies = allergyNames.map((allergyName, index) => ({
          name: allergyName,
          index: index
      }));

      // Construct the object with patient's name and allergies
      const patientData = {
          name: `${patientAllergies.firstname} ${patientAllergies.lastname}`,
          allergies: allergies
      };

      // Push the patientData to the patientsData array
      patientsData.push(patientData);
  });

  setallergies(patientsData);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  };


useEffect(() => {
    fetchDataFromApi('');
  }, []);


useEffect(() => {
    console.log(allergies);
  }, [allergies]);

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
      <SearchPatient search={fetchDataFromApi}/>
      <form onSubmit={handleSubmit}>
        <h3>Allergies:</h3>
        <ol>
          {allergies.map((allergyjson, index) => (
            <li key={index}>
            <h3> {allergyjson.name} </h3>
              
              
              {allergyjson.allergies.map((allergy, index) => (
                <div>
                <ol>
                <li style={{'list-style': 'inside'}}>{allergy.name}</li>
                </ol>
                </div>
              
             
              ))}

            </li>
          ))}
        </ol>
      </form>
    </div>
  );
}

export default Allergies;
