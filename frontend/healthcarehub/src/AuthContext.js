// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [authIsReady, setAuthIsReady] = useState(null);
  const [settings, setSettings] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {

    const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    

  };
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/get/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });

          if (response.status === 200) {
            localStorage.setItem('name', response.data.user.firstname); 
            localStorage.setItem('role', response.data.user.role); 
            setUser({ role: response.data.user.role , name: response.data.user.firstname  });
            setAuthIsReady(true);
          }
        } 
        else {
          handleLogout();
          setUser(null);
          setAuthIsReady(false);
        }
      } catch (error) {
            handleLogout();
            setUser(null);
            setAuthIsReady(false);
            console.error('Error fetching user data:', error);
        // Handle errors here, e.g., set state accordingly
      }


    };

    const fetchSettings = async () => {
      try {
       
          const response = await axios.get('/api/get/domain/settings', {
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });

          if (response.status === 200) {
            setSettings(response.data.data);
          }
        } 
        
       catch (error) {
            setSettings(null);
            console.error('Error while fetching domain Settings', error);
      }


    };

    fetchData();
    fetchSettings();
  }, []);

  return (
    <AuthContext.Provider value={{ authIsReady, user , settings}}>
      {children}
    </AuthContext.Provider>
  );
};
