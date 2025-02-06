import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './prescriptionlist.css';
import PrescriptionDetails from './PrescriptionDetails';
import AddMedication from './AddMedication'
import SearchPatient from './../SearchPatient'

function PrescriptionShared() {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [viewClicked, setViewClicked] = useState([]);
  const [iscreatenewprescription , setiscreatenewprescription]= useState(false);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

    const fetchPrescriptions = async (name) => {
    try {

      const response = await axios.get(`/api/get/shared/prescriptions`,  {
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

  const deletePrescription = async(id) => {
    try {

      const response = await axios.delete(`/api/delete/prescription/${id}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      const updatedprescriptionList = prescriptionList.filter(prescription => prescription.id !== id);
      setPrescriptionList(updatedprescriptionList);


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
  }


useEffect(() => {
    fetchPrescriptions('');
  }, []);

    const SearchPrescriptions = async (filterpatient) => {
    try {

      const response = await axios.get(`/api/get/shared/prescriptions?name=${filterpatient}`,  {
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
    <div>
    {!iscreatenewprescription ? (
    <div className="prescription-list">
      <h2>Shared Prescriptions</h2>

      
      <SearchPatient search={SearchPrescriptions}/>
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
                <td>{prescription.firstname} {prescription.lastname}</td>
                <td>{prescription.description}</td>
                <td>{prescription.created_at ? new Date(prescription.created_at).toISOString().split('T')[0] : "Invalid Date"}</td>
                <td>{prescription.status}</td>
                <td>
                  
                  {viewClicked[prescription.id] && <button onClick={() => handleViewClick(prescription.id)}>Close</button>}
                  
                  
                  {!viewClicked[prescription.id] && <button onClick={() => handleViewClick(prescription.id)}>View</button>}
                  <b>   </b>
                </td>
              </tr>
              {viewClicked[prescription.id] && (
                <tr>
                  <td colSpan="5">
                    <PrescriptionDetails PrescriptionId={prescription.id}  />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    ) : ( 
    <div>
     <AddMedication CreateNewPrescription={CreateNewPrescription}/>
      </div>
    )}
    </div>
  );
}

export default PrescriptionShared;
