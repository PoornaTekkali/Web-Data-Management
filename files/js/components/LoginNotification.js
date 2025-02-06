import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginNotification = () => {
  const [ShowNotification, setShowNotification] = useState(null);

  useEffect(() => {
    // Check if the reminder has already been shown
    const loginNotificationShown = sessionStorage.getItem('notification');
    if (!loginNotificationShown) {
      // Fetch medication reminder when the component mounts
      fetchNotification();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // This effect runs only once when the component mounts

  const fetchNotification = async () => {
    try {

      setShowNotification('Yooo');
      sessionStorage.setItem('notification', 'true');
    } catch (error) {
      console.error('Error fetching medication reminder:', error);
    }
  };

  const handleNotificationClose = () => {
    // Close the notification and clear the medication reminder
    setShowNotification(null);
  };

  return (
    <div>
    {ShowNotification && (
    <div className="notification-container" style={{"margin-top":"3%"}}>
        <div className="notification">
        <h2> Login Credentials for Demo </h2>
        <div className="notification-content">


          <div className="email-password">


          <h3> For Admin   </h3>
          <p>email : admin@gmail.com </p>    

          </div>


          <div className="email-password">
          <h3> For Health Admin  </h3>
          <p>email : healthadmin@gmail.com  </p>
          </div>


          <div className="email-password">
          <h3> For Doctor  </h3>
          <p>email : doctor@gmail.com  </p>
          </div>


          <div className="email-password">
          <h3> For Patient  </h3>
          <p>email : patient@gmail.com  </p>
          </div>



          <div className="email-password">
          <h3> For Pharamcist  </h3>
          <p>email : pharamcist@gmail.com  </p>
          </div>


          <div className="email-password">
          <h3> Password </h3>
          <p>password : type any password  </p>
          </div>


          <button onClick={handleNotificationClose}>Close</button>
          </div>
        </div>
    </div>
    )}
    </div>
  );
};

export default LoginNotification;
