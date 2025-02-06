import React, { useState, useEffect } from 'react';
import './DoctorProfile.css'; // Import your CSS for styling
import male_doctor from './../../assets/male_doctor.png'
import axios from 'axios';
import female_doctor from './../../assets/female_doctor.png'
import medicalrecord from'./../../assets/medical-record.png'


function DoctorProfile(props) {
  const [doctor, setDoctor] = useState([]);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchDoctor = async () => {
      try {
    const response = await axios.get(`/api/get/doctor/${props.id}`,  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    setDoctor(response.data[0]);
  }
  catch (error) {
      
      console.log(error)
        setError('ERROR: Somethig went wrong');
    }
  }
  fetchDoctor();

  }, []);

    



function Profile({ doctor}) {
  return (
    <div className="doctor-profile">
    <div>{error && <p className="error-message">{error}</p>}</div>
      <div className="profile-info">
        <div>
          <strong>Qualification:</strong> {doctor.qualification}
        </div>
        <div>
          <strong>  Specialization:</strong> {doctor.specialization}
        </div>
        <div>
          <strong>Location:</strong> {doctor.address}
        </div>
        <div>
          <strong>License Number:</strong> {doctor.licensenumber}
        </div>
        <div>
          <strong>Affiliated Facility:</strong> {doctor.facility_name}
        </div>
        <div>
          <strong>About:</strong> {doctor.about}
        </div>
      </div>
    </div>
  );
}



  return (
    <div className="DoctorProfile">

      <img src={doctor.gender === 'male' ? male_doctor : female_doctor} alt="Doctor icon" className="profile-pic" style={{ width: '50px', height: '50px' }} />
      <h2>{doctor.firstname} {doctor.lastname} </h2>     
      <Profile doctor={doctor}
      />
    </div>
  );
}

export default DoctorProfile;
