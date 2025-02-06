import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';


function UserProfileData() {
  const [UserProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserProfile, seteditedUserProfile] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');


  const fetchUserProfile = async () => {


      try {
      const response = await axios.get(`/api/get/patient/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          }); 

      setUserProfile(response.data[0]);
      seteditedUserProfile(response.data[0]); 
    }
    catch (error) {
      console.error('Error fetching UserProfile records:', error);
    }

  }
    

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSubmit = async(event) => {

    try {
      const response = await axios.post(`/api/update/patient/profile`, editedUserProfile , {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          }); 
    }
    catch (error) {
      console.error('Error fetching UserProfile records:', error);
    }
    setUserProfile(editedUserProfile);
    setSuccessMessage("User Details saved successfully");
    setTimeout(() => {
            setSuccessMessage('');
        }, 2000); 


    event.preventDefault();
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    seteditedUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="user-profile">
      <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
      <h2>User Details</h2>
      {UserProfile ? (
        <div>
            <div>
              <label htmlFor="email">User Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={editMode ? editedUserProfile.email : UserProfile.email}
                onChange={handleInputChange}
                disabled={true}
              />
            </div>

            <div className="input-row">

            <div>
              <label htmlFor="firstname">FirstName:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={editMode ? editedUserProfile.firstname : UserProfile.firstname}
                onChange={handleInputChange}
                disabled={!editMode}
              />
              </div>

              <div className="form-group">
              <label htmlFor="lastname">LastName:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={editMode ? editedUserProfile.lastname : UserProfile.lastname}
                onChange={handleInputChange}
                disabled={!editMode}
              />
              </div>
            </div>


          <div className="input-row">  
            
            <div>
              <label htmlFor="dateofbirth">Date of Birth: </label>
              <input
                type="text"
                id="dateofbirth"
                name="dateofbirth"
                value={editMode ? editedUserProfile.dateofbirth : UserProfile.dateofbirth}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>


        <div className="">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={editMode ? editedUserProfile.gender : UserProfile.gender}
            onChange={handleInputChange}
            disabled={!editMode}
            >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

          </div>

          <div className="input-row">  
            <div>
              <label htmlFor="phoneNumber">Phone Number :</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={editMode ? editedUserProfile.phoneNumber : UserProfile.phoneNumber}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
            <div>
              <label htmlFor="emergencycontactnumber">Emergency Contact Number: </label>
              <input
                type="text"
                id="emergencycontactnumber"
                name="emergencycontactnumber"
                value={editMode ? editedUserProfile.emergencycontactnumber : UserProfile.emergencycontactnumber}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
          </div>


            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={editMode ? editedUserProfile.address : UserProfile.address}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
            {editMode && <button onClick={handleCancel}>Cancel</button>}
            {editMode && <button type="submit" onClick={handleSubmit}>Save</button>}
          
          {!editMode && <button onClick={handleEdit}>Edit</button>}
        </div>
      ) : (
        <p>Loading  UserProfile Data...</p>
      )}
    </div>
  );
}

export default UserProfileData;
