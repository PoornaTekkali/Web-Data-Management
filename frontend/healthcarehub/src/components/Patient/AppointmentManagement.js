import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AppointmentManagement.css';
import axios from 'axios';

function AppointmentManagement({appointment,handleViewClick , updateAppointment , DeleteAppointment}) {
  const [selectedDate, setSelectedDate] = useState(new Date(appointment.date));
  const [id, setId] = useState(appointment.id);
  const [reason, setReason] = useState(appointment.reason);
  const [selectedTime, setSelectedTime] = useState(appointment.time);
  const [duration , setDuration] = useState(appointment.duration);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  console.log(selectedTime)
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };


  const handleSave = async () => {

    if (!selectedDate || !reason || !selectedTime ||!duration ) {
      setError('Please fill out the required fields.');
      return;
    }

    const convertedTime = selectedTime.split(':').slice(0, 2).join(':');

    const data = {
      id:appointment.id,
      status:appointment.status,
      date : selectedDate.toISOString().split('T')[0] ,
      reason : reason ,
      time: convertedTime,
      duration: duration ,
      doctor_firstname: appointment.doctor_firstname,
      doctor_lastname : appointment.doctor_lastname    
    }
    console.log(data)
    
    try {
      const response = await axios.post(`/api/update/appointment/${id}` , data , {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    setError('');
    setSuccessMessage("Appointment Saved Successfully");
    setTimeout(() => {
            setSuccessMessage('');
            updateAppointment(data);
            handleViewClick(appointment.id);

        }, 1000); 
    }
    

    catch (error) {
      
        console.log(error)
        setError('ERROR: Somethig went wrong');
    }


  };



    const handleCancel = async () => {

      try {
      const response = await axios.delete(`/api/delete/appointment/${id}`  , {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    setError('');
    setSuccessMessage("Appointment Cancelled Successfully");
    setTimeout(() => {
            setSuccessMessage('');
            DeleteAppointment(appointment.id);
            handleViewClick(appointment.id);

        }, 1000); 
    }
    

    catch (error) {
      
        console.log(error)
        setError('ERROR: Somethig went wrong');
    }

  };


  return (
    <div className="user-appointment-management">
    <div>{error && <p className="error-message">{error}</p>}</div>
    <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
      <div className="user-appointment-management-container">
        <div className="user-calendar-container">
          <h2>Select Appointment Date:</h2>
          <Calendar className="user-Calendar" onChange={handleDateChange} value={selectedDate} />
        </div>

        <div className="user-reason-container">

        <h2>Duration:</h2>
        <select className="user-duration-select"
            value={duration}
            onChange={e => setDuration(e.target.value)}
          >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
        </select>

        <h2>Time:</h2>
          <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
        />

          <h2>Reason for Visit:</h2>
          <textarea
            rows="6"
            cols="50"
            value={reason}
            onChange={handleReasonChange}
            placeholder=" "
          ></textarea>
          <br />
        <button className="user-confirm-appointment" onClick={handleSave} style={{"margin" : "2%" }} >Save</button>
        <button className="user-confirm-appointment" onClick={handleCancel} style={{"margin" : "2%" }} >Delete Appointment</button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentManagement;
