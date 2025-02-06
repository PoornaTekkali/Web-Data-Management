import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Prescription({PrescriptionId, handleViewClick}) {
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [editedprescriptionDetails, setEditedprescriptionDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [viewEdit, setEditClicked] = useState([]);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [viewReminder , setReminderClicked] = useState(false);




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





  const handleReminderClick = (id) => {
    setReminderClicked(prevClicked => ({
      ...prevClicked,
      [id]: !prevClicked[id]
    }));
  };

  return (
    <div className="prescription">
      <h2>Prescription Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Time</th>
            
          </tr>
        </thead>
        <tbody>
          {prescriptionDetails.map((medication , index) => (
            <tr key={medication.id}>
              <td>
                <input
                  type="text"
                  value={editMode ? editedprescriptionDetails[index].name : medication.name}
                  disabled={!editMode}
                />
              </td>

              <td>
                <input
                  type="text"
                  value={editMode ? editedprescriptionDetails[index].dosage : medication.dosage}
                  disabled={!editMode}
                />
              </td>
              <td>
                <select value={editMode ? editedprescriptionDetails[index].time : medication.time}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Prescription;
