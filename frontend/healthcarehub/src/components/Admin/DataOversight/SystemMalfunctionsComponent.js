import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './DataOversight.css'

const SystemMalfunctionsComponent = () => {


  const [ systemMalfunctions ,setsystemMalfunctions ]  = useState([]);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);

  useEffect(() => {


    const fetchdata = async () => {

      try{
      const response = await axios.get('/api/get/support/system_malfunctions', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      console.log(response);
      setsystemMalfunctions(response.data);
    }
    catch (error) {
      console.log(error)
      setError('ERROR: Somethig went wrong');
    }

    }
    fetchdata();
  }, []);



  return (
    <div className="dataoversight">
      <h2>System Malfunctions</h2>
      <div>{error && <p className="error-message">{error}</p>}</div>
      <table>
        <thead>
          <tr>
            <th>Support ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {systemMalfunctions.map((malfunction, index) => (
            <tr key={index}>
              <td>{malfunction.id}</td>
              <td>{malfunction.title}</td>
              <td>{malfunction.description}</td>
              <td>{malfunction.created_at ? new Date(malfunction.created_at).toISOString().split('T')[0] : "Invalid Date"}</td>
              <td>{malfunction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SystemMalfunctionsComponent;
