import React, { useState, useEffect } from 'react';
import './AppointmentList.css';
import axios from 'axios';

function AppointmentList() {
  const [appointmentList, setappointmentList] = useState([]);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch appointment history data from an external source (e.g., API)
  useEffect(() => {
    
    const fetchappointments = async () => {
      try{
      const response = await axios.get(`/api/get/doctor/upcoming/appointments`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      setappointmentList(response.data);
    }
    catch(error) {
      console.log(error)
    }
  };

    fetchappointments();
  }, []);

  const handleCancelAppointmentClick = async (appointment) => {

    appointment.time = appointment.time.split(':').slice(0, 2).join(':');
    appointment.status='Cancelled';
    try {
      const response = await axios.post(`/api/update/appointment/${appointment.id}` , appointment , {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    setError('');
    setSuccessMessage("Appointment Cancelled Successfully");
    setTimeout(() => {
            setSuccessMessage('');
            const updatedAppointments = appointmentList.filter(Appointment => Appointment.id !== appointment.id);
            setappointmentList(updatedAppointments);

        }, 1000); 
    }
    
    catch (error) {
      
        console.log(error)
        setError('ERROR: Somethig went wrong');
    }
    
  };

  return (
    <div className="appointment-list">
      <h2 className="appointment-heading">Your Upcoming Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Duration </th>
            <th>With</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.map((appointment) => (
            <React.Fragment key={appointment.id}>
              <tr>
                
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.duration} minutes</td>
                <td>{appointment.patient_firstname} {appointment.patient_lastname}</td>
                 <td>{appointment.reason}</td>
                


                <td>{appointment.status}</td>
                <td>
                  <button onClick={() => handleCancelAppointmentClick(appointment)}>Cancel</button>
                </td>
              </tr>

            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
