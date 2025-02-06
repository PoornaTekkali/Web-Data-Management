import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css'; 
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'; // Import recharts for chart components

function AnalyticsDashboard() {
  // State for analytics data
  const [analyticsData, setAnalyticsData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAnalyticsData(); 
  }, []);



    
    const fetchAnalyticsData = async () => {
      try{
      const response = await axios.get(`/api/get/doctor/appointments/analytics`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
      setAnalyticsData(response.data);
    }
    catch(error) {
      console.log(error)
    }
  };



  const totalAppointments = analyticsData.reduce((total, dataPoint) => total + dataPoint.appointmentCount, 0);


  const [isMobile, setIsMobile] = useState(false);


   useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600; // You can adjust the threshold as needed
      console.log(isMobile ? 'Mobile view' : 'Desktop view');
      setIsMobile(isMobile);
    };

    handleResize();
  }, []);

  return (
    <div className='analytics-container'>
    <div className="analytics-dashboard-container">
      <h1>Analytics Dashboard</h1>
      <div className="analytics-summary">
        <div> <h3> Total Appointments: {totalAppointments} </h3> </div>
      </div>
      <div className="analytics-charts">


        <h2>Appointments Over Time</h2>
        <BarChart width={isMobile ? 350 : 600} height={isMobile ? 200 : 300}  data={analyticsData} className="recharts-wrapper">
          {/* X-axis */}
          <XAxis dataKey="date" />
          {/* Y-axis */}

        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {/* Tooltip */}
          <Tooltip />
          {/* Legend */}
          <Legend />
          {/* Bar chart */}
          <Bar dataKey="appointmentCount" fill="#82ca9d" />
        </BarChart>



      </div>
    </div>
    </div>
  );
}

export default AnalyticsDashboard;
