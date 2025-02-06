import React, { useState, useEffect } from 'react';
import Allergies from './MedicationHistory/Allergies'
import FamilyHistory from './MedicationHistory/FamilyHistory'
import Surgeries from './MedicationHistory/Surgeries'
import PastIllness from './MedicationHistory/PastIllness'
import ShareSettings from './ShareSettings'

import Exercise from './HealthRecords/Exercise'
import BasicHealthRecord from './HealthRecords/BasicHealthRecord'
import VitalSigns from './HealthRecords/VitalSigns'


import PrescriptionsList from './PrescriptionsList';
import UserProfile from './UserProfile';
import AppointmentList from './AppointmentLists';
import Messenger from '../messenger/Messenger'

import Footer from './../footer/Footer'; 
import Navbar from './../navbar/Navbar'
import medicalrecord from'./../../assets/medical-record.png'
import prescription from './../../assets/prescription.png'
import user from './../../assets/examination.png'
import bar from './../../assets/menu-bar-.png'
import close from './../../assets/cross.png'
import calender from './../../assets/calendar.png';
import vitalsigns from './../../assets/vital-signs.png'
import messenger from './../../assets/online-chat.png'
import shareSettings from './../../assets/share.png'
import { useHistory, useNavigate } from 'react-router-dom';


function User({settings}) {


  const [activeComponent, setActiveComponent] = useState('');

  const [isOpen, setIsopen] = useState(true);
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [isDropDownOpen1, setDropDownOpen1] = useState(false);

    const [isMobile, setIsMobile] = useState(false);


 useEffect(() => {
  const handleResize = () => {
    const isMobile = window.innerWidth <= 600; // You can adjust the threshold as needed
    console.log(isMobile ? 'Mobile view' : 'Desktop view');
    setIsMobile(isMobile);
  };

  // Initial check
  handleResize();
}, []);


  const setComponent = (component) => {
    setActiveComponent(component);
    if(isMobile){
    setIsopen(!isOpen);
  }

}

  const handleDropDown = () => {
    if(isMobile){
      setActiveComponent('')
    }
    setDropDownOpen(!isDropDownOpen);
    setDropDownOpen1(false);
  };

  const handleDropDown1 = () => {
    if(isMobile){
      setActiveComponent('')
    }
    setDropDownOpen1(!isDropDownOpen1);
    setDropDownOpen(false);
  };


  const handleToggle = () => {
    if(isMobile){
    setActiveComponent('')
    }
    setIsopen(!isOpen);
  };

  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/messenger');
  };


  return (
    <div className="user-container">
      <Navbar settings={settings}/>
      {isOpen && (
      <div className="sidebar">
          <button onClick={handleToggle}> <img src={bar} alt="menu bar"  /> Menu Bar </button>
          <button onClick={() => setComponent('UserProfile')}> <img src={user} alt="Stethoscope Icon"  /> User Details</button>
          
          { settings && settings.enableMedicationHistory === 1 &&  
          <button onClick={handleDropDown}>
            <img src={medicalrecord} alt="MedicationHistory Icon"  />
            Medication History 
            {isDropDownOpen && <img src={close} alt="menu bar"  />}
          </button>
        }

          {(
            isDropDownOpen
          ) && (          
          <div className="medical-history-drop-down" >
          
            <button onClick={() => setComponent('PastIllness')}> Past illness </button>
            <button onClick={() => setComponent('Allergies')}> Allergies </button>
            <button onClick={() => setComponent('Surgeries')}> Surgeries </button>
             <button onClick={() => setComponent('FamilyHistory')}> Family History </button>
          </div>
          )}

          { settings && settings.enablePrescription === 1 && 
          <button onClick={() => setComponent('PrescriptionsList')}> <img src={prescription} alt="PrescriptionsList Icon"  /> Prescriptions</button>
        }

          {settings && settings.enableHealthRecords === 1 &&  
          <button onClick={handleDropDown1}> <img src={vitalsigns} alt="MedicationHistory Icon"  />  Health Records {isDropDownOpen1 && <img src={close} alt="menu bar"  />}  </button>
        
         
        }
          {(
            isDropDownOpen1
          ) && (          
          <div className="medical-record-drop-down" >
          
            <button onClick={() => setComponent('BasicHealthRecord')}>  Basic </button>
            <button onClick={() => setComponent('Exercise')}> Exercise </button>
            <button onClick={() => setComponent('VitalSigns')}> Vital Signs </button>
          </div>
          )}
         

          {settings && settings.enableAppointments === 1 &&  
          <button onClick={() => setComponent('AppointmentList')}> <img src={calender} alt="HealthRecords Icon"  /> Appointments</button>
          }
          <button onClick={() => setComponent('ShareSettings')}> <img src={shareSettings} alt="ShareSettings Icon"  /> Share Settings</button>

          {settings && settings.enableMessenger === 1 &&  
          <button onClick={handleCreateClick}> <img src={messenger} alt="Messenger Icon"  /> Messenger</button>
        }
      </div>
      )}
      {!isOpen && (
      <div className="sidebar">
          <button onClick={handleToggle}> <img src={bar} alt="menu bar"  /> </button>
          
        {!isMobile && (
            <div>
          <button onClick={() => setComponent('UserProfile')}> <img src={user} alt="Stethoscope Icon"  /> </button>
          <button onClick={() => setComponent('MedicationHistory')}> <img src={medicalrecord} alt="MedicationHistory Icon"  /></button>
          
          
          <button onClick={() => setComponent('PrescriptionsList')}> <img src={prescription} alt="PrescriptionsList Icon"  /> </button>
          <button onClick={() => setComponent('HealthRecords')}> <img src={vitalsigns} alt="HealthRecords Icon"  /></button>
          <button onClick={() => setComponent('AppointmentList')}> <img src={calender} alt="Appointments Icon"  /> </button>
          <button onClick={() => setComponent('ShareSettings')}> <img src={shareSettings} alt="ShareSettings Icon"  /> </button>
          <button onClick={handleCreateClick}> <img src={messenger} alt="Messenger Icon"  /> </button>
        </div>
          )}        
      </div>
      )}

        <div className="user-data">
          {activeComponent === 'ShareSettings' && <ShareSettings />}
          {activeComponent === 'UserProfile' && <UserProfile />}
          {activeComponent === 'Allergies' && <Allergies />}
          {activeComponent === 'PastIllness' && <PastIllness />}
          {activeComponent === 'Surgeries' && <Surgeries />}
          {activeComponent === 'FamilyHistory' && <FamilyHistory />}

         {activeComponent === 'PrescriptionsList' && <PrescriptionsList />}
          {activeComponent === 'AppointmentList' && <AppointmentList />}
         
          {activeComponent === 'Exercise' && <Exercise />}
          {activeComponent === 'VitalSigns' && <VitalSigns />}
          {activeComponent === 'BasicHealthRecord' && <BasicHealthRecord />}



          
        </div>
    </div>
  );
}

export default User;