import React, { useState, useEffect } from 'react';
import AppointmentManagement from './AppointmentManagement'
import axios from 'axios';

function AppointmentList() {
  const [appointmentList, setappointmentList] = useState([]);
  const [viewClicked, setViewClicked] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch appointment history data from an external source (e.g., API)
  useEffect(() => {
    const fetchappointments = async () => {

      try {
      const response = await axios.get(`/api/get/user/appointments`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          }); 

      setappointmentList(response.data);
    }
  catch (error) {
      console.error('Error Something went wrong:', error);
    }
  }

    fetchappointments();
  }, []);

const updateAppointment = (updatedAppointment) => {
  console.log(updatedAppointment)
  const updatedList = appointmentList.map((appointment) =>
    appointment.id === updatedAppointment.id ? updatedAppointment : appointment
  );
  setappointmentList(updatedList);
};

const DeleteAppointment = (deletedAppointmentId) => {
  const updatedList = appointmentList.filter((appointment) =>
    appointment.id !== deletedAppointmentId
  );
  setappointmentList(updatedList);
};

  const handleViewClick = (id) => {
    setViewClicked(prevClicked => ({
      ...prevClicked,
      [id]: !prevClicked[id]
    }));
  };

  return (
    <div className="appointment-list">
      <h2 className="appointment-heading">Your Appointments</h2>
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
                <td>{appointment.doctor_firstname} {appointment.doctor_lastname} </td>
                 <td>{appointment.reason} </td>
                <td>{appointment.status}</td>
                <td>
                  {viewClicked[appointment.id] && <button onClick={() => handleViewClick(appointment.id)}>Close</button>}
                  {!viewClicked[appointment.id] && appointment.status=='Active' && <button onClick={() => handleViewClick(appointment.id)}>Edit</button>}
                </td>
              </tr>
              {viewClicked[appointment.id] && (
                <tr>
                  <td colSpan="7">
                    <AppointmentManagement appointment={appointment} handleViewClick={handleViewClick} updateAppointment={updateAppointment} DeleteAppointment={DeleteAppointment}

                    />
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

export default AppointmentList;
