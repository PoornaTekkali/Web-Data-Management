import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../navbar/Navbar';

function MedicationDispensation({settings}) {
  // Static data for prescriptions
  const staticPrescriptions = [
    {
      id: 1,
      medication: { name: "Aspirin", dosage: "100mg" },
      instructions: "Take one tablet daily with food"
    },
    {
      id: 2,
      medication: { name: "Amoxicillin", dosage: "500mg" },
      instructions: "Take two tablets twice daily for 7 days"
    },
    {
      id: 3,
      medication: { name: "Ibuprofen", dosage: "200mg" },
      instructions: "Take one tablet every 4-6 hours as needed for pain"
    },
    {
      id: 4,
      medication: { name: "Lisinopril", dosage: "10mg" },
      instructions: "Take one tablet daily in the morning"
    },
    {
      id: 5,
      medication: { name: "Metformin", dosage: "500mg" },
      instructions: "Take one tablet twice daily with meals"
    },
    {
      id: 6,
      medication: { name: "Omeprazole", dosage: "20mg" },
      instructions: "Take one capsule daily before a meal"
    },
    // Add more prescriptions as needed
  ];

  // State for prescriptions
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions(); // Fetch prescriptions from API on component mount
  }, []);

  // Fetch prescriptions from API
  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get('https://api.smarthealthhub.com/prescriptions');
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      // If API request fails, fallback to static data
      setPrescriptions(staticPrescriptions);
    }
  };

  const dispenseMedication = (prescriptionId) => {
    // Implement dispensing logic here
    console.log(`Medication dispensed for prescription ${prescriptionId}`);
  };

  return (
    <div className='medication-container'>
        <Navbar settings={settings}/>
    <div className="medication-dispensation-container">
      <h1 className='medication-heading'>Medication Dispensation</h1>
      <div className="prescription-list">
        <h2>Prescription List</h2>
        <ul>
          {prescriptions.map(prescription => (
            <li key={prescription.id}>
              <div className="prescription-details">
                <h3>{prescription.medication.name}</h3>
                <p><strong>Dosage:</strong> {prescription.medication.dosage}</p>
                <p><strong>Instructions:</strong> {prescription.instructions}</p>
                <button onClick={() => dispenseMedication(prescription.id)}>Dispense Medication</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default MedicationDispensation;
