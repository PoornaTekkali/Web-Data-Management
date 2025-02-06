import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FamilyHistory.css'
import SearchPatient from './../../SearchPatient'
import Select from 'react-select';

function FamilyHistory() {
  const [familyhistory, setfamilyhistory]  = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const [Useroptions, setUseroptions] = useState([]);

    const fetchFamilyHistory = async (name) => {
    try {

      const response = await axios.get(`/api/get/shared/medical/history?type=FAMILYHEALTH&&name=${name}`,  {
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
    fetchFamilyHistory('');
  }, []);

  const handleAddfamilyhistory = () => {
  fetchOptions();
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


  const handleSave = async (id) => {
    try {
      const data=familyhistory[id];
      const response = await axios.post('/api/create/history/FamilyHealth', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
    setSuccessMessage("Added successfully");

    const updatedfamilyhistory = familyhistory.filter((familyhistorydata, index) => index !== id);
    // Add the response data (saved exercise) to the list
    data['editable'] = false;
    data['firstname'] = data['Patient'].split(' ')[0];
    data['lastname'] = data['Patient'].split(' ').slice(1).join(' ');    
    updatedfamilyhistory.push(data);

    // Update the exercises state with the modified list
    setfamilyhistory(updatedfamilyhistory);



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

  const fetchUsers = async () => {
    try {
    const response = await axios.get(`/api/get/share/patients`, {
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

  const fetchOptions = async (inputValue) => {
    try {

      const data= await fetchUsers()

      const transformedOptions = data.map((provider) => ({
        value: provider.user_id,
        label: provider.firstname + ' ' + provider.lastname,
      }));
      setUseroptions(transformedOptions);
    } catch (error) {
      console.error('Error fetching primary care providers:', error);
    }
  };

const handleOptionChange = (e,index) => {
  const updatedfamilyhistory = [...familyhistory];

    updatedfamilyhistory[index]['user_id'] = e.value;
    updatedfamilyhistory[index]['Patient'] = e.label;
    setfamilyhistory(updatedfamilyhistory);
  };



  return (
    <div className="family-history">
      <h2>Family Health History</h2>
      <SearchPatient search={fetchFamilyHistory}/>
        <h3>FamilyHistory:</h3>
        <ul>
          {familyhistory.map((history, index) => (
            <li key={index}>


            <label htmlFor={`Patient-${index}`}>Patient:</label>

            {history.editable ? 
        <div>
          <Select
            id="Patient"
            name='Patient'
            value={Useroptions.find(option => option.value === (editMode ? history.Patient : history.Patient))}
            onChange={(e) => handleOptionChange(e, index,)}
            options={Useroptions}
            style={{ "height": "0px"}}
            isSearchable
            isDisabled={!editMode}
              styles={{
              option: (provided) => ({
                ...provided,
                color: 'black', // Set the color to black
              }),
            }}
          />
        </div>
        :
          <input
                id={`Patient-${index}`}
                type="text"
                value={history.firstname + ' ' + history.lastname}
                onChange={(e) => handleInputChange(e, index, 'Patient')}
                disabled={!history.editable}
                className={history.editable ? "editable" : ""}
              />
    }


              <label htmlFor={`name-${index}`}>Name:</label>
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
              {history.editable && <button type="button" onClick={() => handleSave(index)}>Save</button> }
            </li>
          ))}
        </ul>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <button type="button"  style={{"width":"100%" , "margin-bottom": "30%"}}  onClick={handleAddfamilyhistory}>Add</button>
    </div>
  );
}

export default FamilyHistory;
