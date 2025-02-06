import React, { useState, useEffect } from 'react';

import UserManagement from './UserManagement/UserManagement'
import DoctorManagement from './HealthcareProviderManagement/DoctorManagement'
import PharmacistManagement from './HealthcareProviderManagement/PharmacistManagement'
import SystemConfiguration from './SystemConfiguration/SystemConfiguration'
import ReportGeneration from './ReportGeneration/ReportGeneration'
import PrivacyIssuesComponent from './DataOversight/PrivacyIssuesComponent'
import DataBreachesComponent from './DataOversight/DataBreachesComponent'
import SystemMalfunctionsComponent from './DataOversight/SystemMalfunctionsComponent'
import close from './../../assets/cross.png'

import patient from './../../assets/patient.png'
import doctor from './../../assets/doctor.png'
import report from './../../assets/report.png'
import configuration from './../../assets/configuration.png'
import oversights from './../../assets/oversights.png'


import user from './../../assets/examination.png'
import bar from './../../assets/menu-bar-.png'
import Navbar from './../navbar/Navbar'
import axios from 'axios';
import messenger from './../../assets/online-chat.png'
import { useHistory, useNavigate } from 'react-router-dom';

function Admin({settings}) {


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


    handleResize();
  }, []);




  const handleToggle = () => {
    if(isMobile){
    setActiveComponent('')
  }
    setIsopen(!isOpen);

  };


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

  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/messenger');
  };

  const setComponent = (component) => {
    setActiveComponent(component);
    if(isMobile){
    setIsopen(!isOpen);
  }



  }


  return (
    <div className="user-container">
      <Navbar settings={settings}/>
      {isOpen && (
      <div className="sidebar">
          <button onClick={handleToggle}> <img src={bar} alt="menu bar"  /> Menu Bar </button>

          
            <button onClick={() => setComponent('UserManagement')}> <img src={patient} alt="Stethoscope Icon"  />  Users  </button>
            <button onClick={handleDropDown1}> <img src={doctor} alt="Stethoscope Icon"  />  
            HealthcareProviders </button>
            {(
            isDropDownOpen1
          ) && (          
          <div className="medical-record-drop-down" >
          
            <button onClick={() => setComponent('Doctors')}>  Doctors </button>
            <button onClick={() => setComponent('Pharmacists')}> Pharmacists </button>
          </div>
          )}
            <button onClick={() => setComponent('SystemConfiguration')}> <img src={configuration} alt="Stethoscope Icon"  />  SystemConfiguration </button>
            
        {
          settings && settings.enableSupport === 1 && 
            <button onClick={handleDropDown}>
              <img src={oversights} alt="DataOversight Icon"  />
              Oversights
              {isDropDownOpen && <img src={close} alt="menu bar"  />}
            </button>
        }
            
            {(
            isDropDownOpen
          ) && (          
          <div className="medical-record-drop-down" >
          
            <button onClick={() => setComponent('DataBreachesComponent')}>  DataBreaches </button>
            <button onClick={() => setComponent('SystemMalfunctionsComponent')}> SystemMalfunctions </button>
            <button onClick={() => setComponent('PrivacyIssuesComponent')}> PrivacyIssues </button>
          </div>
          )}

            <button onClick={() => setComponent('ReportGeneration')}> <img src={report} alt="Stethoscope Icon"  />  Reports </button>
            {settings && settings.enableMessenger === 1 &&  
          <button onClick={handleCreateClick}> <img src={messenger} alt="Messenger Icon"  /> Messenger</button>
        }

      </div>
      )}
      {!isOpen  && (
      <div className="sidebar">
          <button onClick={handleToggle}> <img src={bar} alt="menu bar"  /> </button> 
          {!isMobile && (
            <div>
          <button onClick={() => setActiveComponent('UserManagement')}> <img src={patient} alt="UserManagement Icon"  /> </button>
          <button onClick={() => setActiveComponent('HealthcareProviderManagement')}> <img src={doctor} alt="HealthcareProviderManagement Icon"  /></button>
          <button onClick={() => setActiveComponent('SystemConfiguration')}> <img src={configuration} alt="SystemConfiguration Icon"  /></button>
          <button> <img src={oversights} alt="DataOversight Icon"  /></button>
          <button onClick={() => setActiveComponent('ReportGeneration')}> <img src={report} alt="ReportGeneration Icon"  /></button>
          <button onClick={handleCreateClick}> <img src={messenger} alt="Messenger Icon"  /> </button>
          </div>
          )}
          
      </div>
      )}

        <div className="user-data">
          {activeComponent === 'UserManagement' && <UserManagement />}
          {activeComponent === 'Doctors' && <DoctorManagement />}
          {activeComponent === 'Pharmacists' && <PharmacistManagement />}
          {activeComponent === 'SystemConfiguration' && <SystemConfiguration />}
          {activeComponent === 'ReportGeneration' && <ReportGeneration />}

          {activeComponent === 'PrivacyIssuesComponent' && <PrivacyIssuesComponent />}
          {activeComponent === 'SystemMalfunctionsComponent' && <SystemMalfunctionsComponent />}
          {activeComponent === 'DataBreachesComponent' && <DataBreachesComponent />}
          
          
        </div>
    </div>
  );
}

export default Admin;