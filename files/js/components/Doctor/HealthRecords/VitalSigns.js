import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VitalSigns.css'
import SearchPatient from './../../SearchPatient'
import Select from 'react-select';


function VitalSigns() {
  const [vitalsigns, setvitalsigns] = useState([]);
  const [editMode, setEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [Useroptions, setUseroptions] = useState([]);

  const fetchVitalSigns = async (name) => {
    try {


      const response = await axios.get(`/api/get/shared/vital/records?name=${name}`,  {
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
    fetchVitalSigns('');
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
  fetchOptions();
    const vitalsign = { bloodpressure: '', date: '', editable: true };
    setvitalsigns([...vitalsigns, vitalsign]);
    setEditMode(true); // Enable edit mode for the newly added illness
  };

  const handleRemoveVitalSigns = async (index , vitalId) => {

    try {
      const response = await axios.delete(`/api/delete/vitalsign/${vitalId}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

    } catch (error) {
      console.error('Error fetching health records:', error);
    }
    const updatedvitalsign = [...vitalsigns];
    updatedvitalsign.splice(index, 1);
    setvitalsigns(updatedvitalsign);
  };

  const handleInputChange = (event, index, key) => {
    const updatedvitalsign = [...vitalsigns];
    updatedvitalsign[index][key] = event.target.value;
    setvitalsigns(updatedvitalsign);
  };


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
    setSuccessMessage("Added successfully");

    const updatedvitalsign = vitalsigns.filter((vitalsign, index) => index !== id);
    // Add the response data (saved exercise) to the list
    data['editable'] = false;
    data['firstname'] = data['Patient'].split(' ')[0];
    data['lastname'] = data['Patient'].split(' ').slice(1).join(' ');
    updatedvitalsign.push(data);

    // Update the exercises state with the modified list
    setvitalsigns(updatedvitalsign);


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
  const updatedvitalsigns = [...vitalsigns];

    updatedvitalsigns[index]['user_id'] = e.value;
    updatedvitalsigns[index]['Patient'] = e.label;
    setvitalsigns(updatedvitalsigns);
  };



  return (
    <div className="vitalsigns">
      <h2>VitalSigns Tracking</h2>
      <SearchPatient search={fetchVitalSigns}/>
        <h3>Past VitalSigns records:</h3>
        <ul>
          {vitalsigns.map((vitalsign, index) => (
            <li key={index}>


            <label htmlFor={`Patient-${index}`}>Patient:</label>

            {vitalsign.editable ?
        <div>
          <Select
            id="Patient"
            name='Patient'
            value={Useroptions.find(option => option.value === (editMode ? vitalsign.Patient : vitalsign.Patient))}
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
                value={vitalsign.firstname + ' ' + vitalsign.lastname}
                onChange={(e) => handleInputChange(e, index, 'Patient')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />
    }
    <label htmlFor={`bloodpressure-${index}`}>BloodPressure:</label>
              <input
                id={`bloodpressure-${index}`}
                type="text"
                value={vitalsign.bloodpressure}
                onChange={(e) => handleInputChange(e, index, 'bloodpressure')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />
              <br />
              <label htmlFor={`bloodsugar-${index}`}>BloodSugar:</label>
              <input
                id={`bloodsugar-${index}`}
                type="text"
                value={vitalsign.bloodsugar}
                onChange={(e) => handleInputChange(e, index, 'bloodsugar')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />
              <br />
              <label htmlFor={`heartrate-${index}`}>HeartRate:</label>
              <input
                id={`heartrate-${index}`}
                type="text"
                value={vitalsign.heartrate}
                onChange={(e) => handleInputChange(e, index, 'heartrate')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />


              <br />
              <label htmlFor={`date-${index}`}>Date:</label>
              <input
                id={`date-${index}`}
                type="text"
                value={vitalsign.date}
                onChange={(e) => handleInputChange(e, index, 'date')}
                disabled={!vitalsign.editable}
                className={vitalsign.editable ? "editable" : ""}
              />


              <button type="button" onClick={() => handleRemoveVitalSigns(index,vitalsign.id)}>Remove</button>
              {vitalsign.editable  && <button type="button" onClick={() => handleSave(index)} >Save</button> }
            </li> 
          ))}
        </ul>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <button type="button"  style={{"width":"100%" , "margin-bottom": "30%"}}  onClick={handleAddVitalSigns}>Add</button>
    </div>
  );
}

export default VitalSigns;
