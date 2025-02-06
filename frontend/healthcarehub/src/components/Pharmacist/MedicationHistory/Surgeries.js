import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchPatient from './../../SearchPatient'
import Select from 'react-select';

function Surgeries() {
  const [surgeries, setsurgeries] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [Useroptions, setUseroptions] = useState([]);

  const fetchDataFromApi = async (name) => {
    try {

      const response = await axios.get(`/api/get/shared/medical/history?type=SURGEY&name=${name}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response.data);
      setsurgeries(response.data);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  };


useEffect(() => {
    fetchDataFromApi('');
  }, []);

  const handleAddSurgeries = () => {
    fetchOptions();
    const surgery = { name: '', date: '', editable: true };
    setsurgeries([...surgeries, surgery]);
    setEditMode(true); // Enable edit mode for the newly added illness
  };

  const handleRemoveSurgeries = async (index,id) => {
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
    const updatedsurgery = [...surgeries];
    updatedsurgery.splice(index, 1);
    setsurgeries(updatedsurgery);
  };


  const handleInputChange = (event, index, key) => {
    const updatedsurgery = [...surgeries];
    updatedsurgery[index][key] = event.target.value;
    setsurgeries(updatedsurgery);
  };


  const handleSave = async (id) => {
    try {

      const data=surgeries[id];
      const response = await axios.post('/api/create/history/Surgeries', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
      setSuccessMessage("Added successfully");

    const updatedsurgeries = surgeries.filter((surgeriesdata, index) => index !== id);
    data['editable'] = false;
    data['firstname'] = data['Patient'].split(' ')[0];
    data['lastname'] = data['Patient'].split(' ').slice(1).join(' ');  
    updatedsurgeries.push(data);

    // Update the exercises state with the modified list
    setsurgeries(updatedsurgeries);
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
  const updatedsurgeries = [...surgeries];

    updatedsurgeries[index]['user_id'] = e.value;
    updatedsurgeries[index]['Patient'] = e.label;
    setsurgeries(updatedsurgeries);
  };



  return (
    <div className="surgeries">
    <h2>Past Surgeries</h2>
        <SearchPatient search={fetchDataFromApi}/>
        <h3>Past Surgeries:</h3>

        <ul>
          {surgeries.map((surgery, index) => (
            <li key={index}>

        
            <label htmlFor={`Patient-${index}`}>Patient:</label>

            {surgery.editable ? 
        <div>
          <Select
            id="Patient"
            name='Patient'
            value={Useroptions.find(option => option.value === (editMode ? surgery.Patient : surgery.Patient))}
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
                value={surgery.firstname + ' ' + surgery.lastname}
                onChange={(e) => handleInputChange(e, index, 'Patient')}
                disabled={!surgery.editable}
                className={surgery.editable ? "editable" : ""}
              />
    }

              
              <label htmlFor={`name-${index}`}>Name:</label>
              <input
                id={`name-${index}`}
                type="text"
                value={surgery.name}
                onChange={(e) => handleInputChange(e, index, 'name')}
                disabled={!surgery.editable}
                className={surgery.editable ? "editable" : ""}
              />
              <br />
              <label htmlFor={`date-${index}`}>Date:</label>
              <input
                id={`date-${index}`}
                type="text"
                value={surgery.date}
                onChange={(e) => handleInputChange(e, index, 'date')}
                disabled={!surgery.editable}
                className={surgery.editable ? "editable" : ""}
              />

              <label htmlFor={`description-${index}`}>Description:</label>
              <input
                id={`description-${index}`}
                type="text"
                value={surgery.description}
                onChange={(e) => handleInputChange(e, index, 'description')}
                disabled={!surgery.editable}
                className={surgery.editable ? "editable" : ""}
              />

            </li>
          ))}
        </ul>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
    </div>
  );
}

export default Surgeries;
