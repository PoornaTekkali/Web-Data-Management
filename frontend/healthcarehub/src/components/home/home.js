import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar'; // Make sure to import the Navbar component
import Footer from '../footer/Footer'; 
import { Link } from "react-router-dom";
import './home.css'; // Import your custom CSS for styling
import calender from './../../assets/calendar.png';
import medicalrecord from'./../../assets/medical-record.png'
import prescription from './../../assets/prescription.png'
import symptomchecker from './../../assets/symptomchecker.png'
import Notification from './notification/Notification'
import Support from '../Support/Support';
import { FaUserMd, FaUserCog, FaUserNurse, FaHospital } from 'react-icons/fa';
import doctor from './../../assets/doctor.png'
import patient from './../../assets/patient.png'
import pharmacist from './../../assets/pharmacist.png'
import healthadmin from './../../assets/healthadmin.png'
import messenger from './../../assets/online-chat.png'
import admin from './../../assets/admin.png'
import axios from 'axios';



function Home({settings , authIsReady , user}) {
  const [toShowAllRoles , setToShowAllRoles]=useState(true);
  const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600; // You can adjust the threshold as needed
      console.log(isMobile ? 'Mobile view' : 'Desktop view');
      setIsMobile(isMobile);
      setToShowAllRoles(false);
    };



    handleResize();
  }, []);




  return (
    <div className="home-container">
      <Navbar settings={settings}/>
      {authIsReady &&  user.role==='PATIENT' && <Notification user={user} /> }
      
      <div className='quote-container'>
        <div className='content-wrapper'>


          <div className='box border'>
          <Link to='doctors'>
            <img src={calender} alt="Calender Icon"  />
            <h2>{isMobile ? 'Appointments' : 'Book an Appointment' }</h2>
          </Link>
            <p>{isMobile ? '' : 'Schedule appointments with healthcare professionals to discuss health concerns and receive treatment.' }</p>
          
          </div>

          <div className='box'>
          <Link to='patient'>
            <img src={medicalrecord} alt="Stethoscope Icon"  />
            <h2>{isMobile ? 'Medical Records' : 'Track Your Medical Records'}</h2>
            </Link>
            <p>{isMobile ? '' : 'Access and manage your medical records digitally, ensuring they are available when needed.'}</p>
          </div>

          <div className='box'>
          <Link to='symptomchecker'>
            <img src={symptomchecker} alt="Stethoscope Icon"  />
            <h2>{isMobile ? 'Symptom Checker' : 'Symptom Checker'}</h2>
          </Link>
            <p>{isMobile ? '' : 'Use symptom checker tool to assess your symptoms and receive guidance on possible causes and next steps.'}</p>
          </div>

          <div className='box'>
          <Link to='pharmacist'>
            <img src={prescription} alt="Stethoscope Icon" />
            <h2>{isMobile ? 'Order Prescriptions' : 'Order Prescriptions'}</h2>
          </Link>
            <p>{isMobile ? ' ' : 'Conveniently request prescription refills and have them delivered to your preferred Loaction.' }</p>
          </div>


          <div className='box'>
          <Link to='messenger'>
            <img src={messenger} alt="messenger Icon" />
            <h2>{isMobile ? 'Messenger' : 'Messenger'}</h2>
          </Link>
            <p>{isMobile ? ' ' : 'Secure encrypted messaging facilitates confidential communication among all users.' }</p>
          </div>

          
          </div>

 {!isMobile &&     
          <div className='content-wrapper'>


          <div className='box'>
          <Link to='patient'>
            <img src={patient} alt="Stethoscope Icon"  />
            <h2> Patients </h2>
            </Link>
            <p>{isMobile ? ' ' : 'Seeks medical care and plays an active role in health management.'}</p>
          </div>

          <div className='box border'>
          <Link to='doctor'>
            <img src={doctor} alt="Calender Icon"  />
            <h2>Doctors</h2>
          </Link>
            <p>{isMobile ? ' ' : 'Provides medical care and treatment in hospitals and clinics'}</p>
          
          </div>



          <div className='box'>
          <Link to='pharmacist'>
            <img src={pharmacist} alt="Stethoscope Icon"  />
            <h2>Pharmacists</h2>
          </Link>
            <p>{isMobile ? ' ' : 'Dispenses medications and ensures their safety and effectiveness.'}</p>
          </div>

          <div className='box'>
          <Link to="/healthadmin">
            <img src={healthadmin} alt="Stethoscope Icon" />
            <h2>Health Admin</h2>
          </Link>
            <p>{isMobile ? ' ' : 'Oversees healthcare organization management and drives improvement.'}</p>
          </div>
          
          <div className='box'>
          <Link to='admin'>
            <img src={admin} alt="Stethoscope Icon" />
            <h2>Administrator</h2>
          </Link>
            <p>{isMobile ? ' ' : 'Manages operations and supports healthcare providers.'}</p>
          </div>
          
          </div>
      }

    
           <Footer />
           {settings && settings.enableSupport==1 && 
               <Support />
            }
      </div>
    </div>
  );
}

export default Home;
