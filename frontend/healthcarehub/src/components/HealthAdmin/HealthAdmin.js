import React, { useState, useEffect } from 'react';

import FacilityManagement from './FacilityManagement/FacilityManagement'
import StaffCoordination from './StaffCoordination/StaffCoordination'
import DoctorManagement from './StaffCoordination/DoctorManagement'
import PharmacistManagement from './StaffCoordination/PharmacistManagement'
import ComplianceOversight from './ComplianceOversight/ComplianceOversight'


import incidentresponse from './../../assets/incidentresponse.png'
import facilitymanagement from './../../assets/facilitymanagement.png'
import complianceoversight from './../../assets/complianceoversight.png'
import staffcoordination from './../../assets/staffcoordination.png'
import user from './../../assets/examination.png'
import bar from './../../assets/menu-bar-.png'
import Navbar from './../navbar/Navbar'
import IncidentResponse from './IncidentResponse/IncidentResponse'
import messenger from './../../assets/online-chat.png'
import { useHistory, useNavigate } from 'react-router-dom';

function User({settings}) {


  const [activeComponent, setActiveComponent] = useState('');

  const [isOpen, setIsopen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropDownOpen, setDropDownOpen] = useState(false);


  useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth <= 600; // You can adjust the threshold as needed
        console.log(isMobile ? 'Mobile view' : 'Desktop view');
        setIsMobile(isMobile);
      };

      // Initial check
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
  };


    const setComponent = (component) => {
    setActiveComponent(component);
    if(isMobile){
    setIsopen(!isOpen);
  }

  };

    const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/messenger');
  };


  return (
    <div className="user-container">
      <Navbar settings={settings} />
      {isOpen && (
      <div className="sidebar">
          <button onClick={handleToggle}> <img src={bar} alt="menu bar"  /> Menu Bar </button>

            <button onClick={() => setComponent('FacilityManagement')}> <img src={facilitymanagement} alt="Stethoscope Icon"  />  FacilityManagement </button>
            <button onClick={handleDropDown}> <img src={staffcoordination} alt="Stethoscope Icon"  />  
            StaffCoordination </button>
            {(
            isDropDownOpen
          ) && (          
          <div className="medical-record-drop-down" >
          
            <button onClick={() => setComponent('Doctors')}>  Doctors </button>
            <button onClick={() => setComponent('Pharmacists')}> Pharmacists </button>
          </div>
          )}

          {settings && settings.enableSupport === 1 && (
            <div>

            <button onClick={() => setComponent('ComplianceOversight')}> <img src={complianceoversight} alt="Stethoscope Icon"  />  ComplianceOversight </button>
            <button onClick={() => setComponent('IncidentResponse')}> <img src={incidentresponse} alt="Stethoscope Icon"  />  IncidentResponse </button>
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
          <button onClick={() => setComponent('FacilityManagement')}> <img src={facilitymanagement} alt="FacilityManagement Icon"  /> </button>
          <button onClick={() => setComponent('StaffCoordination')}> <img src={staffcoordination} alt="StaffCoordination Icon"  /></button>
          <button onClick={() => setComponent('ComplianceOversight')}> <img src={complianceoversight} alt="ComplianceOversight Icon"  /></button>
          <button onClick={() => setComponent('IncidentResponse')}> <img src={incidentresponse} alt="IncidentResponse Icon"  /></button>
          <button onClick={handleCreateClick}> <img src={messenger} alt="Messenger Icon"  /> </button>
          </div>
          )}
      </div>
      )}

        <div className="user-data">
          {activeComponent === 'Doctors' && <DoctorManagement />}
          {activeComponent === 'Pharmacists' && <PharmacistManagement />}
          {activeComponent === 'FacilityManagement' && <FacilityManagement />}
          {activeComponent === 'StaffCoordination' && <StaffCoordination />}
          {activeComponent === 'ComplianceOversight' && <ComplianceOversight />}
          {activeComponent === 'IncidentResponse' && <IncidentResponse />}
          
          
        </div>
    </div>
  );
}

export default User;