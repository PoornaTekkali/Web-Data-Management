import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrescriptionDetails from './PrescriptionDetails';

function PrescriptionList() {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [viewClicked, setViewClicked] = useState([]);
  const [filterpatient , setFilterpatient] = useState('');
  const [iscreatenewprescription , setiscreatenewprescription]= useState(false);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

    const fetchPrescriptions = async (name) => {
    try {

      const response = await axios.get(`/api/get/user/prescriptions`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response.data);
      setPrescriptionList(response.data);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  };

  const updatePrescription = async(id, status) => {
    try {

      const response = await axios.put(`/api/update/prescription/${id}`, {
        'status' : status
      },{
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
      })

      


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
      

const updatedprescriptionList = prescriptionList.map(prescription => {
    if (prescription.id === id) {
        // If the prescription ID matches the provided ID, toggle the status
        return { ...prescription, status: (prescription.status === 'Active' ? 'Inactive' : 'Active') };
    } else {
        // For other prescriptions, return them unchanged
        return prescription;
    }
})
setPrescriptionList(updatedprescriptionList); 
};




useEffect(() => {
    fetchPrescriptions('');
  }, []);

    const SearchPrescriptions = async () => {
    try {

      const response = await axios.get(`/api/get/user/prescriptions?name=${filterpatient}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    })

      console.log(response.data);
      setPrescriptionList(response.data);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  };



    const CreateNewPrescription = () => {
      setiscreatenewprescription(!iscreatenewprescription)

    }

  const handleViewClick = (id) => {
    setViewClicked(prevClicked => ({
      ...prevClicked,
      [id]: !prevClicked[id]
    }));
  };

  return (

    <div className="prescription-list">
      <h2>Prescriptions</h2>
      <div className="prescription-filter-container">


      </div>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prescriptionList.map((prescription) => (
            <React.Fragment key={prescription.id}>
              <tr>
                <td>{prescription.user_firstname} {prescription.user_lastname}</td>
                <td>{prescription.description}</td>
                <td>{prescription.created_at ? new Date(prescription.created_at).toISOString().split('T')[0] : "Invalid Date"}</td>
                <td>{prescription.status}</td>
                <td>
                  
                  {viewClicked[prescription.id] && <button onClick={() => handleViewClick(prescription.id)}>Close</button>}
                  
                  
                  {!viewClicked[prescription.id] && <button onClick={() => handleViewClick(prescription.id)}>View</button>}
                  <b>   </b>
                  {viewClicked[prescription.id] && prescription.status==='Active' && <button onClick={() => updatePrescription(prescription.id,'Inactive')}>Mark InActive</button>}
                  <b>   </b>
                  {viewClicked[prescription.id] && prescription.status==='Inactive' && <button onClick={() => updatePrescription(prescription.id,'Active')}>Mark Active</button>}
                </td>
              </tr>
              {viewClicked[prescription.id] && (
                <tr>
                  <td colSpan="5">
                    <PrescriptionDetails PrescriptionId={prescription.id}  handleViewClick={handleViewClick}/>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrescriptionList;
