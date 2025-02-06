import React, { useState, useEffect } from 'react';
import './SystemConfiguration.css'
import axios from 'axios';

const SystemConfiguration = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [settings, setSettings] = useState(null);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);



useEffect(() => {

  fetchSettings();
  }, []);



  const handleExpirationTimeChange = (e) => {
    setSettings({
      ...settings,
      ['tokenExpiration']: parseInt(e.target.value),
    });
  };

  const fetchSettings = async () => {
      try {
       
          const response = await axios.get('/api/get/domain/settings', {
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });

          if (response.status === 200) {
            setSettings(response.data.data);
          }
        } 
        
       catch (error) {
            setSettings(null);
            setError('Error while fetching domain Settings');
            console.error('Error while fetching domain Settings', error);
      }


    };



  const handleToggleSetting = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  const handleSubmit = async () => {
    try {
          const data=settings;
          const response = await axios.put('/api/update/domain/settings',data ,  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });

          if (response.status === 200) {
            setSettings(response.data.data);
            window.location.reload();
          }
        } 
        
       catch (error) {
            setSettings(null);
            console.error('Error while fetching domain Settings', error);
      }
    setSuccessMessage("SystemConfiguration settings saved successfully");
    setTimeout(() => {
            setSuccessMessage('');
        }, 2000); 

  }

  return (

    <div className="systemconfiguration">
      <h2>System Configuration</h2>
      <div>{error && <p className="error-message">{error}</p>}</div>

    { settings && 
      <div>
        <h3>Login and SignUp Settings</h3>

        <div className="form-group">
       
          <div className="toggle">
            <input
              type="checkbox"
              id="enablelogin"
              checked={settings.enableLogin}
              onChange={() => handleToggleSetting('enableLogin')}
            />
            <div className="slider round" onClick={() => handleToggleSetting('enableLogin')}></div>
          </div>
           <label htmlFor="enablelogin">   Enable Login</label>
        </div>


        <div className="form-group">
        
          <div className="toggle">
            <input
              type="checkbox"
              id="enablesignup"
              checked={settings.enableSignup}
              onChange={() => handleToggleSetting('enableSignup')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableSignup')}></div>
          </div>
          <label htmlFor="enablesignup"> Enable SignUp</label>
        </div>

        <div>
        <label>
          Expiration Time (minutes):
          <input
            type="text"
            value={settings.tokenExpiration}
            onChange={handleExpirationTimeChange}
            style={{"width": "30%"}}
          />
        </label>
      </div>


      <hr />


      <div>
        <h3>User Roles Settings</h3>

        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enableDoctor"
              checked={settings.enableDoctor}
              onChange={() => handleToggleSetting('enableDoctor')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableDoctor')}></div>
          </div>
          <label htmlFor="enableDoctor"> Enable Doctor</label>
        </div>

        
        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enablepatient"
              checked={settings.enablePatient}
              onChange={() => handleToggleSetting('enablePatient')}
            />
            <div className="slider round" onClick={() => handleToggleSetting('enablePatient')}></div>
          </div>
          <label htmlFor="enablepatient"> Enable Patient</label>
        </div>

      <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enablePharmacist"
              checked={settings.enablePharmacist}
              onChange={() => handleToggleSetting('enablePharmacist')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enablePharmacist')}></div>
          </div>
          <label htmlFor="enablePharmacist"> Enable Pharmacist</label>
        </div>



      </div>

      <hr />


      <div>
        <h3>Maintenance Settings</h3>
        
        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enableMaintenance"
              checked={settings.enableMaintenance}
              onChange={() => handleToggleSetting('enableMaintenance')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableMaintenance')}></div>
          </div>
          <label htmlFor="enableMaintenance"> Under Maintenance</label>
        </div>
      </div>

      <hr />

      <div>
        <h3>Enable Features</h3>
        


        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enableAppointments"
              checked={settings.enableAppointments}
              onChange={() => handleToggleSetting('enableAppointments')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableAppointments')}></div>
          </div>
          <label htmlFor="enableAppointments">  Appointments</label>
        </div>

        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enableMessenger"
              checked={settings.enableMessenger}
              onChange={() => handleToggleSetting('enableMessenger')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableMessenger')}></div>
          </div>
          <label htmlFor="enableMessenger">  Messenger</label>
        </div>

        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enableHealthForums"
              checked={settings.enableHealthForums}
              onChange={() => handleToggleSetting('enableHealthForums')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableHealthForums')}></div>
          </div>
          <label htmlFor="enableHealthForums">  HealthForums</label>
        </div>

        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enableSupport"
              checked={settings.enableSupport}
              onChange={() => handleToggleSetting('enableSupport')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableSupport')}></div>
          </div>
          <label htmlFor="enableSupport">  Support</label>
        </div>



        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enablePrescription"
              checked={settings.enablePrescription}
              onChange={() => handleToggleSetting('enablePrescription')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enablePrescription')}></div>
          </div>
          <label htmlFor="enablePrescription">  Prescriptions</label>
        </div>

        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enableHealthRecords"
              checked={settings.enableHealthRecords}
              onChange={() => handleToggleSetting('enableHealthRecords')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableHealthRecords')}></div>
          </div>
          <label htmlFor="enableHealthRecords">  HealthRecords</label>
        </div>


        <div className="form-group">
          <div className="toggle">
            <input
              type="checkbox"
              id="enableMedicationHistory"
              checked={settings.enableMedicationHistory}
              onChange={() => handleToggleSetting('enableMedicationHistory')}
            />

            <div className="slider round" onClick={() => handleToggleSetting('enableMedicationHistory')}></div>
          </div>
          <label htmlFor="enableMedicationHistory">  MedicationHistory</label>
        </div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <button onClick={handleSubmit} style={{"width" : "100%" , "marginBottom": "8%"}}>  Save</button>
        

      </div>
      </div>
    }
    </div>
  );
};

export default SystemConfiguration;
