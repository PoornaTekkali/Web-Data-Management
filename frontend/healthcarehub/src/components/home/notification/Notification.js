import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './notification.css';

const MedicationReminders = ({user}) => {
  const [medicationReminder, setMedicationReminder] = useState(null);
  const token = localStorage.getItem('token');



    const fetchDataFromApi = async (time) => {
      try {
      const response = await axios.get(`/api/get/user/medication_reminders?time=${time}`, 
        {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout 
          });
      return response.data;
    }
    catch(error){
      console.log(error)
    }
  };
  const getTimeOfDay = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 7 && currentHour < 12) {
        return 'morning';
      } else if (currentHour >= 12 && currentHour < 17) {
        return 'afternoon';
      } else if (currentHour >= 17 && currentHour < 23) {
        return 'night';
      } else{
        return null;
      }
      console.log(currentHour)
    };

  useEffect(() => {
        const fetchData = async () => {
            const time = getTimeOfDay();
            if(time){
            const data = await fetchDataFromApi(time);
            setMedicationReminder(data);
            
            const currentTime = new Date().getTime();
            const expirationTime = currentTime + (3 * 60 * 60 * 1000); // 3 hours in milliseconds

            sessionStorage.setItem('medicationReminderShown', JSON.stringify({
              value: 'true',
              expiresAt: expirationTime
            }));

        }
      };

  const storedItem = sessionStorage.getItem('medicationReminderShown');

  if (storedItem) {
  const { value, expiresAt } = JSON.parse(storedItem);

  if (expiresAt && new Date().getTime() < expiresAt) {
    console.log('Medication reminder was shown');
  } 
  else {
    console.log('Medication reminder was not shown or has expired');  
     
    sessionStorage.removeItem('medicationReminderShown');
    fetchData(); 
  }
}
else {
    console.log('Medication reminder item does not exist in sessionStorage');
    fetchData(); 
  }

}, []);



  const handleNotificationClose = () => {
    setMedicationReminder(null);
  };

  return (
    <div className="notification-container">
      
      {medicationReminder && (
        <div className="notification">
        <h2> Medication Reminders </h2>
        <div className="notification-content">

          <h3> It's time to take your medication </h3>

          <hr />
           {
            medicationReminder.map(medication => (
              <div>
          <p>Name : {medication.name}  </p>
          <p> Dosage : {medication.dosage} </p>
          <hr />
          </div>
          
          ))}



          <button onClick={handleNotificationClose}>OK got it</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default MedicationReminders;
