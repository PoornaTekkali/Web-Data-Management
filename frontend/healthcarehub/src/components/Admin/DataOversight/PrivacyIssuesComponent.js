import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './DataOversight.css'

const PrivacyIssuesComponent = () => {

    const [privacyIssues, setprivacyIssues ]= useState([]);
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    useEffect(() => {


    const fetchdata = async () => {

    try {
      const response = await axios.get('/api/get/support/privacy_issues',  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      console.log(response);
      setprivacyIssues(response.data);
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
      <h2>Privacy Issues</h2>
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
          {privacyIssues.map((issue, index) => (
            <tr key={index}>
              <td>{issue.id}</td>
              <td>{issue.title}</td>
              <td>{issue.description}</td>
              <td>{issue.created_at ? new Date(issue.created_at).toISOString().split('T')[0] : "Invalid Date"}</td>
              <td>{issue.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PrivacyIssuesComponent;
