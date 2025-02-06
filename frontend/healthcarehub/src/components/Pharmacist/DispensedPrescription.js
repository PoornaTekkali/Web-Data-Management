import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrescriptionDetails from './PrescriptionDetails';
import SearchPatient from './../SearchPatient'

function PrescriptionList() {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [viewClicked, setViewClicked] = useState([]);
  const [iscreatenewprescription , setiscreatenewprescription]= useState(false);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

    const fetchPrescriptions = async (name) => {
    try {

      const response = await axios.get(`/api/get/pharmacist/prescription/dispensations`,  {
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

  const dispensePrescription = async(id) => {
    try {

      const data = {
        prescription_id : id
      }
      const response = await axios.post(`/api/create/prescription/dispensation`, data ,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds

    });
      setSuccessMessage('Dispense prescription successfully');



    } catch (error) {
      console.error('Error fetching  records:', error);
    }
  }




useEffect(() => {
    fetchPrescriptions('');
  }, []);

    const SearchPrescriptions = async (filterpatient) => {
    try {

      const response = await axios.get(`/api/get/pharmacist/prescription/dispensations?name=${filterpatient}`,  {
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


  const updateDispensation = async(order_id , id, status) => {
    try {

      const response = await axios.put(`/api/update/prescription/dispensation/${order_id}`, {
        'status' : status
      },{
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    })// Update the prescription list state


    } catch (error) {
      console.error('Error fetching Family History records:', error);
    }
      

const updatedprescriptionList = prescriptionList.map(prescription => {
    if (prescription.id === id) {
        // If the prescription ID matches the provided ID, toggle the status
        return { ...prescription, status: status };
    } else {
        // For other prescriptions, return them unchanged
        return prescription;
    }
});
setPrescriptionList(updatedprescriptionList);
}




  const handleViewClick = (id) => {
    setViewClicked(prevClicked => ({
      ...prevClicked,
      [id]: !prevClicked[id]
    }));
  };

  return (
    <div className="prescription-list">
      <h2>Dispensed Prescriptions</h2>

      
      <SearchPatient search={SearchPrescriptions}/>
      <table>
        <thead>
          <tr>
            <th>Order id </th>
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
              <td>{prescription.order_id}</td>
                <td>{prescription.firstname} {prescription.lastname}</td>
                
                <td>{prescription.description}</td>
                <td>{prescription.created_at ? new Date(prescription.created_at).toISOString().split('T')[0] : "Invalid Date"}</td>
                <td>{prescription.status}</td>
                <td>
                  
                  {viewClicked[prescription.id] && <button onClick={() => handleViewClick(prescription.id)}>Close</button>}
                  
                  
                  {!viewClicked[prescription.id] && <button onClick={() => handleViewClick(prescription.id)}>View</button>}
                  <b>   </b>
                  {viewClicked[prescription.id] && prescription.status==='InTransit' && <button onClick={() => updateDispensation(prescription.order_id, prescription.id , 'Cancelled' )}>Cancel</button>}
                   <b>   </b>
                  {viewClicked[prescription.id] && prescription.status==='InTransit' && <button onClick={() => updateDispensation(prescription.order_id , prescription.id , 'Delivered' )}>Delivered</button>}
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
);
}

export default PrescriptionList;


