import React, { useState, useEffect } from 'react';
import Allergies from './MedicationHistory/Allergies'
import FamilyHistory from './MedicationHistory/FamilyHistory'
import Surgeries from './MedicationHistory/Surgeries'
import PastIllness from './MedicationHistory/PastIllness'


import PrescriptionsList from './PrescriptionsList';
import UserProfile from './UserProfile';

import Navbar from './../navbar/Navbar'
import medicalrecord from'./../../assets/medical-record.png'
import prescription from './../../assets/prescription.png'
import user from './../../assets/examination.png'
import bar from './../../assets/menu-bar-.png'
import close from './../../assets/cross.png'
import calender from './../../assets/calendar.png';
import messenger from './../../assets/online-chat.png'
import DispensedPrescription from './DispensedPrescription'

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
          <button onClick={handleDropDown1}>
            <img src={prescription} alt="Prescriptions Icon"  />
            Prescriptions
            {isDropDownOpen1 && <img src={close} alt="menu bar"  />}
          </button>
        }

          {(
            isDropDownOpen1
          ) && (          
          <div className="medical-history-drop-down" >
          
            <button onClick={() => setComponent('PrescriptionsList')}> Shared  </button>
            <button onClick={() => setComponent('DispensedPrescription')}> Orders </button>

          </div>
          )}

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
          <button onClick={handleCreateClick}> <img src={messenger} alt="Messenger Icon"  /> </button>
        </div>
      )}
      
      </div>
      )}

        <div className="user-data">
          {activeComponent === 'UserProfile' && <UserProfile />}
          {activeComponent === 'Allergies' && <Allergies />}
          {activeComponent === 'PastIllness' && <PastIllness />}
          {activeComponent === 'Surgeries' && <Surgeries />}
          {activeComponent === 'FamilyHistory' && <FamilyHistory />}

         {activeComponent === 'PrescriptionsList' && <PrescriptionsList />}
         {activeComponent === 'DispensedPrescription' && <DispensedPrescription />}
         


          
        </div>
    </div>
  );
}

export default User;