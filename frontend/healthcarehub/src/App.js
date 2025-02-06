import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useAuthContext from './useAuthContext';
import { Navigate , Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


import Home from './components/home/home';

import Login from './components/login/Login';
import AdminLogin from './components/adminlogin/Login';
import SignUp from './components/signup/Signup';
import ForgotPassword from './components/forgotpassword/ForgotPassword'

import ForumPage from './components/forums/ForumPage';
import CreateForum from './components/forums/CreateForum';
import Forums from './components/forums/HealthForum';

import DoctorSearchPage from './components/appointment/doctorsearch'

import Footer from './components/footer/Footer'
import Patient from './components/Patient/User'
import Doctor from './components/Doctor/User'
import Pharmacist from './components/Pharmacist/User'
import HealthAdmin from './components/HealthAdmin/HealthAdmin'
import Admin from './components/Admin/Admin'
import AboutUsPage from './components/CompanyDropdown/AboutUs/AboutUsPage';
import Services from './components/CompanyDropdown/ServicePage';
import ContactUs from './components/CompanyDropdown/ContactUs';

import SymptomChecker from './components/SymptomChecker/SymptomChecker'
import Messenger from './components/messenger/Messenger'


import Navbar from './components/navbar/Navbar'
import NotFoundPage from './components/NotFoundPage';
import DisablePage from './components/DisablePage';
import MaintenancePage from './components/MaintenancePage';
import './mobile.css'


function App() {


  const { authIsReady, user , settings } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [showMaintenancePage, setShowMaintenancePage] = useState(false);
  

  useEffect(() => { 
    // Once authIsReady becomes true, set loading to false
    if (authIsReady!== null && settings!== null) {
      setLoading(false);
    }
    checkSettings();
  }, [authIsReady, settings]); 




const checkSettings = () => {
  if (settings !== null && settings.enableMaintenance === 1) {
    const excludedPaths = ['/adminlogin', '/admin'];
    const currentPath = window.location.pathname;
    if (!excludedPaths.includes(currentPath)) { 
      setShowMaintenancePage(true);
    }
  }
}

if (loading) {
  return <div className="container"> </div>;
}

if (showMaintenancePage) {
  return <MaintenancePage />;
}



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home settings={settings} authIsReady={authIsReady} user={user}/>} />

          <Route path="/login"element={ settings.enableLogin === 1 ?  <Login settings={settings}/> : <DisablePage name='Login Feature' settings={settings}/> } />
          <Route path="/adminlogin" element={<AdminLogin settings={settings}/> } />
          <Route path="/signup" element={authIsReady ?  <Navigate to="/" /> : (settings.enableSignup === 1 ?   <SignUp settings={settings}/> : <DisablePage name='SignUp Feature' settings={settings}/> ) } />
          <Route path="/forgotpassword" element={authIsReady ?  <Navigate to="/" /> : <ForgotPassword settings={settings}/> } />
          

          <Route path="/doctors" element={authIsReady && user.role === 'PATIENT' ? (settings.enableAppointments === 1 ?  <DoctorSearchPage settings={settings}/> : <DisablePage name='Appointment Module' settings={settings}/> ) : <Navigate to="/login" />} />
          

          
          <Route path="/patient" element={authIsReady && user.role === 'PATIENT' ?  (settings.enablePatient === 1 ?   <Patient settings={settings}/> : <DisablePage name='Patient Role' settings={settings}/> )  :  <Navigate to="/login" />} />
          <Route path="/doctor" element={authIsReady && user.role === 'DOCTOR' ? (settings.enableDoctor === 1 ?   <Doctor settings={settings}/> : <DisablePage name='Doctor Role' settings={settings}/> ) : <Navigate to="/login" />} />
          <Route path="/pharmacist" element={authIsReady && user.role === 'PHARMACIST' ? (settings.enablePharmacist === 1 ?   <Pharmacist settings={settings}/> : <DisablePage name='Pharmacist Role' settings={settings}/> ) : <Navigate to="/login" />} />
          

          <Route path="/admin" element={authIsReady && user.role === 'ADMIN' ? <Admin settings={settings}/> : <Navigate to="/adminlogin" />} />
          <Route path="/healthadmin" element={authIsReady && user.role === 'HEALTHADMIN' ? <HealthAdmin settings={settings}/> : <Navigate to="/login" />} />

          

          <Route path="/forums" element={ settings.enableHealthForums === 1 ? <Forums settings={settings}/> : <DisablePage name='HealthForums' settings={settings}/> } />                    
          <Route path="/forum/:forumId" element={authIsReady ? (settings.enableHealthForums === 1 ?   <ForumPage settings={settings}/> : <DisablePage name='HealthForums Module' settings={settings}/> ) :  <Navigate to="/login" />} />
          <Route path="/createforum" element={authIsReady ?  (settings.enableHealthForums === 1 ?   <CreateForum settings={settings}/> : <DisablePage name='HealthForums Module' settings={settings}/> ) : <Navigate to="/login" />} />


          <Route path="/symptomchecker" element={<SymptomChecker settings={settings}/>} />          
          <Route path="/about-us" element={<AboutUsPage settings={settings}/>} />
          <Route path="/services" element={<Services settings={settings}/>} />
          <Route path='/contact-us' element={<ContactUs settings={settings}/>} />


          <Route path="/messenger" element={authIsReady ?  (settings.enableMessenger === 1 ?   <Messenger settings={settings}/> : <DisablePage name='Messenger Module' settings={settings}/> ) : <Navigate to="/login" />} />

          <Route path="*" element={<NotFoundPage />} />
          <Route path='/error' element={<MaintenancePage />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
