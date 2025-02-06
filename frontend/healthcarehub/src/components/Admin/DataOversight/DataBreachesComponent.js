import './DataOversight.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataBreachesComponent = () => {


  const [dataBreaches, setdataBreaches ]= useState([]);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchdataBreaches = async () => {
      try {
      const response = await axios.get('/api/get/support/data_breaches',  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout 
          });
      setdataBreaches(response.data);
    }
    catch (error) {
      console.log(error)
      setError('ERROR: Somethig went wrong');
    }
    }
    fetchdataBreaches();
    

    
  }, []);

  return (
    <div className="dataoversight">
    <div>{error && <p className="error-message">{error}</p>}</div>
      <h2>Data Breaches</h2>
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
          {dataBreaches.map((breach, index) => (
            <tr key={index}>
              <td>{breach.id}</td>
              <td>{breach.title}</td>
              <td>{breach.description}</td>
              <td>{breach.created_at ? new Date(breach.created_at).toISOString().split('T')[0] : "Invalid Date"}</td>
              <td>{breach.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataBreachesComponent;
