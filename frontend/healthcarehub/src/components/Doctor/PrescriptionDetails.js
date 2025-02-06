import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Prescription.css';

function Prescription({PrescriptionId, handleViewClick}) {
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [editedprescriptionDetails, setEditedprescriptionDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [viewEdit, setEditClicked] = useState([]);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  




  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
    try {

      const response = await axios.get(`/api/get/prescription/details/${PrescriptionId}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response.data);
      setPrescriptionDetails(response.data);
      setEditedprescriptionDetails(response.data);

    } catch (error) {
      console.error('Error: while fetching Data', error);
    }
  };

    fetchPrescriptionDetails();
  }, []);


  const deletePrescriptionDetail = async(id) => {
    try {

      const response = await axios.delete(`/api/delete/prescription/details/${id}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      const updatedprescriptionDetails = prescriptionDetails.filter(prescriptionDetail => prescriptionDetail.id !== id);
      setPrescriptionDetails(updatedprescriptionDetails);
      setEditedprescriptionDetails(updatedprescriptionDetails);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  }



const UpdatePrescriptionDetails = async () => {
    try {

      const data =  { editedprescriptionDetails };
      const response = await axios.put(`/api/update/prescription/details`, data , {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });


      console.log(response.data);
      handleViewClick(PrescriptionId);

      

    } catch (error) {
      console.error('Error: while fetching Data', error);
    }
  };
    


  const handleSaveClick = (id) => {

setEditedprescriptionDetails((prevState) => ({
    ...prevState,
  }));
    setSuccessMessage("Edited successfully");
    setTimeout(() => {
            setSuccessMessage('');
        }, 2000); 
    setEditMode(false);
    setEditClicked(prevClicked => ({
      ...prevClicked,
      [id]: !prevClicked[id]
    }));
  };


  const handleEditClick = (id) => {
    setEditMode(!editMode);
    setEditClicked(prevClicked => ({
      ...prevClicked,
      [id]: !prevClicked[id]
    }));
  };


const handleInputChange = (event, index, key) => {
  const { value } = event.target;
  setEditedprescriptionDetails(prevState => {
    const updatedDetails = [...prevState]; // Make a copy of the state array
    updatedDetails[index] = { ...updatedDetails[index], [key]: value }; // Update the specific item
    return updatedDetails; // Return the updated array
  });
};


  return (
    <div className="prescription">
      <h2>Prescription Details</h2>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Time</th>
            <th>
              {viewEdit[prescriptionDetails.id] && <button onClick={() => handleEditClick(prescriptionDetails.id)}>Cancel</button>}
              {viewEdit[prescriptionDetails.id] && <button onClick={() => UpdatePrescriptionDetails(prescriptionDetails.id)}>Save</button>}
              {!viewEdit[prescriptionDetails.id] && handleViewClick &&  <button onClick={() => handleEditClick(prescriptionDetails.id)}>Edit</button>}
            </th>
          </tr>
        </thead>
        <tbody>
          {prescriptionDetails.map((medication,index) => (
            <tr key={medication.id}>
              <td>
                <input
                  type="text"
                  value={editMode ? editedprescriptionDetails[index].name : medication.name}
                  onChange={(e) => handleInputChange(e, index , 'name')}
                  disabled={!editMode}
                />
              </td>
        
              <td>
                <input
                  type="text"
                  value={editMode ? editedprescriptionDetails[index].dosage : medication.dosage}
                  onChange={(e) => handleInputChange(e, index , 'dosage')}
                  disabled={!editMode}
                />
              </td>
              <td>
                <select value={editMode ? editedprescriptionDetails[index].time : medication.time}
                    onChange={(e) => handleInputChange(e, index , 'time')}
                    disabled={!editMode}
                  >
                  <option value="1-1-1">1-1-1</option>
                  <option value="1-0-1">1-0-1</option>
                  <option value="1-0-0">1-0-0</option>
                  <option value="0-0-1">0-0-1</option>
                  <option value="0-1-0">0-1-0</option>
                  <option value="0-1-1">0-1-1</option>
                  <option value="1-1-0">1-1-0</option>     
                </select>
              </td>
              <td>
              {viewEdit[prescriptionDetails.id] && <button onClick={() => deletePrescriptionDetail(medication.id)}>Delete</button>}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Prescription;
