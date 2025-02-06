// IncidentReportIcon.js
import React, { useState } from 'react';

import { Link } from "react-router-dom";
import comments from './../../assets/issue.png'
import Logo from '../../assets/daily-health-app.png';
import axios from 'axios';

import { FaExclamationCircle } from 'react-icons/fa'; // Import icon from react-icons library
import './Support.css'; // Import CSS file for styling


function Support() {

  const [showChat, setShowChat] = useState(false);
  const [showForum, setshowForum] = useState(false);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity:'Low',
    type: 'incident_response',
    status: 'Open'
  });

  const toggleChat = () => {
    setShowChat(prevState => !prevState);
  };

  const toggleForum = () => {
    setshowForum(prevState => !prevState);

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async() => {

    //event.preventDefault();

    try {
    const response = await axios.post('/api/create/support/issue', formData,  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });;
    setSuccessMessage("Reported  successfully");
    setTimeout(() => {
            setSuccessMessage('');
            setFormData({
      title: '',
      description: '',
      type: 'General',
      severity:'Low',
      status: 'Open'
    });
    }, 5000); 
    setshowForum(false);
    
  }
  catch (error) { 
      if(error.response.status==401){
        setError('You Should login to Report an Issue');
        setTimeout(() => {
            setError('');
        }, 2000); 
      }
      
    }
    console.log(error);
}

  return (
    <div className="chatbox-container">
      <div className="chatIcon" onClick={toggleChat}>
        <img src={comments} alt="Chat Icon" />
      </div>
      {showChat && (
        <div className="chatbox">
          <div className="chatbox-header">
          
            <div className="chatbox-header-title"><img src={Logo} width="20" height="20" alt="Logo" /> SmartHealthCare Support</div>
            <div className="chatbox-header-close" onClick={toggleChat}>×</div>
          </div>
          <div className="chatbox-body">
          { !showForum && ( 
            <div>
            <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
            <div className="chatbox-message">Welcome to SmartHealthCare Hub 
            <p>If you encounter any issues such as data breaches or system impairments, please use the support form below to report them.</p>
            </div>
          
            <div className="chatbox-buttons">
              <button className="button" onClick={toggleForum}>Report us</button>
            </div>
            </div>
          )} 

        { showForum && (
          <div className="forum-form">
          <h1 style={{"alignText":"left"}}>Report us </h1>

          <div>{error && <p className="error-message">{error}</p>}</div>

            <label>Report Type *</label>
            <select name="type" value={formData.type} onChange={handleInputChange}>

              <option value="incident_response">Incident Report</option>
              <option value="data_breaches">Data Breach</option>
      
              
              <option value="system_malfunctions">System Malfunctions</option>
              <option value="privacy_issues">Privacy Issues</option>
              <option value="compliance_issues">Compliance Issues</option>

              

            </select>

            <label>Severity  *</label>
            <select name="severity" value={formData.severity} onChange={handleInputChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
              

            </select>


            <label>Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />

            <label>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange}  required rows={5}  />




            <button className="button" onClick={toggleForum}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
            </div>
        )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;
