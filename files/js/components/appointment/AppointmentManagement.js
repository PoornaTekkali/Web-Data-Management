import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AppointmentManagement.css';
import axios from 'axios';

function AppointmentManagement( { doctorid , updateParentState , userid }  ) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [duration , setDuration] = useState(15);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {

    if (!selectedDate || !reason || !selectedTime ||!duration ) {
      setError('Please fill out the required fields.');
      return;
    }

    const data= {
      date : selectedDate.toISOString().split('T')[0] ,
      reason : reason ,
      time: selectedTime,
      duration: duration ,
      doctor_id : doctorid ,
    }
    console.log(data)
    
    try {
       const token = localStorage.getItem('token');
      const response = await axios.post('/api/create/appointment' , data , {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    setError('');
    setSuccessMessage("Appointment Booked Successfully");
    setTimeout(() => {
            setSuccessMessage('');
            updateParentState(userid);
        }, 1000); 
    }
    

    catch (error) {
      
        console.log(error)
        setError('ERROR: Somethig went wrong');
    }


  };
  


  return (
    <div className="appointment-management">
    <div>{error && <p className="error-message">{error}</p>}</div>
    <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
      <div className="appointment-management-container">
        <div className="calendar-container">
          <h2>Select Appointment Date:</h2>
          <Calendar className="Calendar" onChange={handleDateChange} value={selectedDate} minDate={new Date()}/>
        </div>

        <div className="reason-container">

        <h2>Duration:</h2>
        <select className="duration-select"
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
        </div>
      </div>
      <button className="confirm-appointment" onClick={handleSubmit}>Confirm Appointment</button>
    </div>
  );
}

export default AppointmentManagement;
