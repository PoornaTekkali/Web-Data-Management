import { CSVLink } from 'react-csv';
import './ReportGeneration.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ReportGeneration = () => {
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState(null);
  const [showDownloadCSV, setShowDownloadCSV] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');


  const fetchdata = async (url) => {
    const response = await axios.get(url,  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    return response.data
  }

  const handleGenerateReport = async (reportype) => {
    setReportType(reportype);
    setReportData(null);
    // Implement logic to fetch data based on the selected report type
    // This is a placeholder example, replace with your actual data fetching logic
    let data;
    switch (reportype) {
      case 'users-list':
        
          try {
            const response = await fetchdata('/api/get/users');
            console.log(response); // Do something with the fetched data
            data = {
              'users': response
            };
            setError('')
            setSuccessMessage("Report Generated Succefully !");
          } 
          catch (error) {
            setError('Failed to Generate Report')
            setSuccessMessage('')
            console.error('Error fetching users:', error);
          }
        break;

      case 'patients-list':
        
          try {
            const response = await fetchdata('/api/get/patients');
            console.log(response); // Do something with the fetched data
            data = {
              'patients': response
            };
            setError('')
            setSuccessMessage("Report Generated Succefully !");
          } 
          catch (error) {
            setError('Failed to Generate Report')
            setSuccessMessage('')
            console.error('Error fetching users:', error);
          }
        break;

      case 'doctors-list':
        
          try {
            const response = await fetchdata('/api/get/doctors');
            console.log(response); // Do something with the fetched data
            data = {
              'doctors': response
            };
            setError('')
            setSuccessMessage("Report Generated Succefully !");
          } 
          catch (error) {
            setError('Failed to Generate Report')
            setSuccessMessage('')
            console.error('Error fetching users:', error);
          }
        break;

      case 'pharmacists-list':
        
          try {
            const response = await fetchdata('/api/get/pharmacists');
            console.log(response); // Do something with the fetched data
            data = {
              'pharmacists': response
            };
            setError('')
            setSuccessMessage("Report Generated Succefully !");
          } 
          catch (error) {
            setError('Failed to Generate Report')
            setSuccessMessage('')
            console.error('Error fetching users:', error);
          }
        break;




      case 'appointments':
        try {
            const response = await fetchdata('/api/get/appointments');
            console.log(response); // Do something with the fetched data
            data = {
              'appointments': response
            };
            setError('')
            setSuccessMessage("Report Generated Succefully !");
          } 
          catch (error) {
            setError('Failed to Generate Report')
            setSuccessMessage('')
            console.error('Error fetching users:', error);
          }
        break;

      case 'system-performance':
        data = {
          performance: {
            activeUsers: 100,
            concurrentConnections: 50,
            resourceRequests: 200,
            resourceQueueLength: 10
          }
        };
        break;
      default:
        data = null;
    }
    setReportData(data);
    setShowDownloadCSV(true);
    
  };

  const csvData = () => {
    // Convert reportData to CSV format
    if (!reportData) return [];
    let csvContent = [];
    console.log(reportData)
    switch (reportType) {

      case 'users-list':
        csvContent = reportData.users.map(user => ({
          Firstname: user.firstname,
          Lastname: user.lastname,
          Email: user.email,
          role: user.role,
          Status: user.is_active,
          'Created Date': user.created_at,
        }));
        break;
      case 'doctors-list':
        csvContent = reportData.doctors.map(doctor => ({
          Firstname: doctor.firstname,
          Lastname: doctor.lastname,
          Email: doctor.email,
          'Created Date': doctor.created_at,
          Address : doctor.address,
          Qualification: doctor.qualification,
          Specialization: doctor.specialization,
          PhoneNumber : doctor.phoneNumber,
          DateOfBirth: doctor.dateofbirth,
          Healthfacilityname: doctor.healthfacilityname,
        }));
        break;

      case 'pharmacists-list':
        csvContent = reportData.pharmacists.map(doctor => ({
          Firstname: doctor.firstname,
          Lastname: doctor.lastname,
          Email: doctor.email,
          'Created Date': doctor.created_at,
          Address : doctor.address,
          Qualification: doctor.qualification,
          Specialization: doctor.specialization,
          PhoneNumber : doctor.phoneNumber,
          DateOfBirth: doctor.dateofbirth,
          Licensenumber: doctor.licensenumber,
          Healthfacilityname: doctor.healthfacilityname,
        }));
        break;



      case 'patients-list':
        csvContent = reportData.patients.map(doctor => ({
          Firstname: doctor.firstname,
          Lastname: doctor.lastname,
          Email: doctor.email,
          DateOfBirth: doctor.dateofbirth,
          'Created Date': doctor.created_at,
          Address : doctor.address,
          PhoneNumber : doctor.phoneNumber,
        }));
        break;


      case 'appointments':
        csvContent = reportData.appointments.map(appointment => ({
          Date: appointment.date,
          Time: appointment.time,
          Duration: appointment.duration,
          Reason: appointment.reason,
          Status: appointment.status,
          "patient_firstname":  appointment.patient_firstname,
          "patient_lastname": appointment.patient_lastname,
          "patient_email": appointment.patient_email,
          "doctor_firstname": appointment.doctor_firstname,
          "doctor_lastname": appointment.doctor_lastname,
          "doctor_email": appointment.doctor_email,
        }));
        break;
      case 'system-performance':
        csvContent = [{
          'Active Users': reportData.performance.activeUsers,
          'Concurrent Connections': reportData.performance.concurrentConnections,
          'Resource Requests': reportData.performance.resourceRequests,
          'Resource Queue Length': reportData.performance.resourceQueueLength
        }];
        break;
      default:
        csvContent = [];
    }
    return csvContent;
  };

return (
    <div className="report-generation">
      <h2>Reports</h2>
      <ul>
        <li>
          <label>List of All Users</label>
          <br/>
          <button onClick={() => handleGenerateReport('users-list')}>Generate</button>
        <div>{error && reportType === 'users-list' && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && reportType === 'users-list' &&  <p className="success-message">{successMessage}</p>}</div>
          {showDownloadCSV && reportType === 'users-list' && (
            <CSVLink data={csvData()} filename="users-list.csv">
              Download CSV
            </CSVLink>
          )}
        </li>

        <li>
        <label>List of Patients</label>
          <br/>
          <button onClick={() => handleGenerateReport('patients-list')}>Generate</button>
        <div>{error && reportType === 'patients-list' && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && reportType === 'patients-list' &&  <p className="success-message">{successMessage}</p>}</div>
          {showDownloadCSV && reportType === 'patients-list' && (
            <CSVLink data={csvData()} filename="patients-list.csv">
              Download CSV
            </CSVLink>
          )}
        </li>

        <li>
          <label>List of Doctors</label>
          <br/>
          <button onClick={() => handleGenerateReport('doctors-list')}>Generate</button>
        <div>{error && reportType === 'doctors-list' && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && reportType === 'doctors-list' && <p className="success-message">{successMessage}</p>}</div>
          {showDownloadCSV && reportType === 'doctors-list' && (
            <CSVLink data={csvData()} filename="doctors-list.csv">
              Download CSV
            </CSVLink>
          )}
        </li>

        <li>
        <label>List of Pharmacists</label>
          <br/>
          <button onClick={() => handleGenerateReport('pharmacists-list')}>Generate</button>
        <div>{error && reportType === 'pharmacists-list' && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && reportType === 'pharmacists-list' &&  <p className="success-message">{successMessage}</p>}</div>
          {showDownloadCSV && reportType === 'pharmacists-list' && (
            <CSVLink data={csvData()} filename="pharmacists-list.csv">
              Download CSV
            </CSVLink>
          )}
        </li>

        <li>
          <label>Appointments</label>
          <br/>
          <button onClick={() => handleGenerateReport('appointments')}>Generate</button>
        <div>{error && reportType === 'appointments' && reportType === 'appointments' &&  <p className="error-message">{error}</p>}</div>
        <div>{successMessage && reportType === 'appointments' &&  <p className="success-message">{successMessage}</p>}</div>
          {showDownloadCSV && reportType === 'appointments' && (
            <CSVLink data={csvData()} filename="appointments.csv">
              Download CSV
            </CSVLink>
          )}
        </li>
        <li>
          <label>System Performance</label>
          <br/>
          <button onClick={() => handleGenerateReport('system-performance')}>Generate</button>
        <div>{error && reportType === 'system-performance' && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && reportType === 'system-performance' && <p className="success-message">{successMessage}</p>}</div>
          {showDownloadCSV && reportType === 'system-performance' && (
            <CSVLink data={csvData()} filename="system-performance.csv">
              Download CSV
            </CSVLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ReportGeneration;
