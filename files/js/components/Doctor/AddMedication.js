import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddMedication.css'
import Navbar from '../navbar/Navbar';
import Select from 'react-select';

function AddMedication({CreateNewPrescription}) {


    const [medication, setMedication] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [patientname, setPatientName] = useState('');
    const [patientid, setPatientid] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    const [Useroptions, setUseroptions] = useState([]);

  const handleAddMedication = () => {
    const medicine = { name: '', dosage: '' , editable: true };
    setMedication([...medication, medicine]);
    setEditMode(true); // Enable edit mode for the newly added illness
  };

  const handleRemoveMedications = (index) => {
    const updatedmedicine = [...medication];
    updatedmedicine.splice(index, 1);
    setMedication(updatedmedicine);
  };

  const handleInputChange = (event, index, key) => {
    const updatedmedicine = [...medication];
    updatedmedicine[index][key] = event.target.value;
    setMedication(updatedmedicine);
  };


    const handleSubmit = async () => {
      const data = {
        user_id: patientid, 
        description: description,
        status: status ,
        medication
      }

    try {
      const response = await axios.post('/api/create/prescription', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
    setSuccessMessage("Added successfully");
    CreateNewPrescription();


    }
    catch (error) {
      setError("Failed to Add");
      console.error('Error fetching health records:', error);
    }
  }

  const fetchUsers = async () => {
    try {
    const response = await axios.get(`/api/get/patients`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    return response.data;
  }
  catch (error) {
      console.error('Error Something went wrong', error);
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

const handleOptionChange = (e) => {

  setPatientid(e.value);
  setPatientName(e.label);

  };

  useEffect(() => {
    fetchOptions();
  }, []);



return (
	    <div className="prescription-form">
       	<h1>Create New Prescription</h1>

        <div className="form-group">
        <label htmlFor="name">Patient Name *</label>
          <Select
            id="Patient"
            name='patientname'
            value={Useroptions.find(option => option.value === (editMode ? patientid : patientid))}
            onChange={(e) => handleOptionChange(e)}
            options={Useroptions}
            style={{ "height": "0px"}}
            isSearchable
              styles={{
              option: (provided) => ({
                ...provided,
                color: 'black', // Set the color to black
              }),
            }}
          />
        </div>



        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>


        <div className="form-group">
        <label htmlFor="status">Status *</label>
          <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          >

          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        </div>

      <h3>Medications:</h3>
        <ul className="addmedications">
          {medication.map((medicine, index) => (
            <li key={index}>
              <label htmlFor={`medicationname-${index}`}>Medication Name:</label>
              <input
                id={`medicationname-${index}`}
                type="text"
                value={medicine.name}
                onChange={(e) => handleInputChange(e, index, 'name')}
                disabled={!medicine.editable}
                className={medicine.editable ? "editable" : ""}
              />

              <label htmlFor={`dosage-${index}`}>Dosage:</label>
              <input
                id={`dosage-${index}`}
                type="text"
                value={medicine.dosage}
                onChange={(e) => handleInputChange(e, index, 'dosage')}
                disabled={!medicine.editable}
                className={medicine.editable ? "editable" : ""}
              />

              <label htmlFor={`time-${index}`}>Time:</label>

                <select value={medicine.time}
                    onChange={(e) => handleInputChange(e, index, 'time')}
                    disabled={!medicine.editable}
                    className={medicine.editable ? "editable" : ""}
                  >
                  <option value="">Select Medication Time</option>
                  <option value="1-1-1">1-1-1</option>
                  <option value="1-0-1">1-0-1</option>
                  <option value="1-0-0">1-0-0</option>
                  <option value="0-0-1">0-0-1</option>
                  <option value="0-1-0">0-1-0</option>
                  <option value="0-1-1">0-1-1</option>
                  <option value="1-1-0">1-1-0</option>     
                </select>


              <button type="button" style={{"width":"30%"}} onClick={() => handleRemoveMedications(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <div>{error && <p className="error-message">{error}</p>}</div>

        <button type="button" style={{"width":"100%"}} onClick={handleAddMedication}>Add Medications</button>  
        <div className="form-group">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={CreateNewPrescription}>Cancel</button>
        </div>      
      </div>

      )

  }

export default AddMedication;