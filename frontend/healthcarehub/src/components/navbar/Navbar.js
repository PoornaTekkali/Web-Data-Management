import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import your custom CSS for styling
import Logo from '../../assets/daily-health-app.png';
import sound from '../../assets/glass.mp3'
import CompanyDropdown from '../CompanyDropdown/CompanyDropdown'
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';


function Navbar({settings }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [isLoggedIn , setIsloggedIn]= useState(false);
  const [showMaintenancePage, setShowMaintenancePage] = useState(false);
  const [user , setuser]= useState('');
  const navigate = useNavigate();

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token){
      setIsloggedIn(true)
    }
    else{
      setIsloggedIn(false)
    }


    const handleResize = () => {
      const isMobile = window.innerWidth <= 600; // You can adjust the threshold as needed
      setIsMobile(isMobile);
    };

    // Initial check
    handleResize(); 
    
  }, []);


useEffect(() => {
  console.log(settings)
  if (settings !== undefined && settings.enableMaintenance === 1) {
    const excludedPaths = ['/adminlogin', '/admin'];
    const currentPath = window.location.pathname;
    if (!excludedPaths.includes(currentPath)) { 
      navigate('/error');
    }
  }

}, [settings])






  const handleDropDown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

   const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsloggedIn(false);
    navigate('/');
    window.location.reload();
    console.log("navigating to /");
    

  };


return (
  <div className="navbar">
    <a href='/' className="logo-container">
      <img src={Logo} width="40" height="40" alt="Logo" />
      <span className="logo-text">{isMobile ? '' : 'SmartHealthCare Hub'}</span>
    </a> 
    <audio id="defaultMessageSound" src={sound} preload="auto" style={{"display": "none"}}></audio>
    
    <div className="nav-links">
      <Link to='/'> 
        <i className="fas fa-home"></i> {isMobile ? ' ' : 'Home'}  
      </Link>
      
    {settings && settings.enableHealthForums===1 && 
      <Link to='/forums'> 
        <i className="fas fa-comments"></i> {isMobile ? ' ' : 'Forums'} 
      </Link>
    }
      

      <CompanyDropdown />


      <Link to='https://blog.sxl9752.uta.cloud'> 
        <i className="fas fa-blog"></i> {isMobile ? ' ' : 'Blog'} 
      </Link>
      
      
      

      
      {!isLoggedIn && 
        <div>
        {settings && settings.enableLogin===1 && 
          <Link to='/login'>  
            <i className="fas fa-sign-in-alt"></i> {isMobile ? '' : 'Login'} 
          </Link>
        }

          {settings && settings.enableSignup===1 && 
          <Link to='/signup'>  
            <i className="fas fa-user-plus"></i>{isMobile ? '' : 'Sign Up'} 
          </Link>
          }
        </div>
      }
    
      

      {isLoggedIn && 
        <div> 
          <Link to={'/' + localStorage.getItem('role').toLowerCase()}>
            <i className="fas fa-user"></i> {localStorage.getItem('name')} 
          </Link>
        </div>
      }
      
      {isLoggedIn && 
        <div onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i>
          {isMobile ? '' : 'Logout'}
        </div>
      
      }
    


    </div>
  </div>
);
}

export default Navbar;