import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Select from 'react-select';
import axios from 'axios';


function UserProfileData() {
  const [UserProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserProfile, seteditedUserProfile] = useState({});
  const [healthfacilitynameoptions, setHealthFacilityNameOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);




    const fetchUserProfile = async () => {
      try {
    const response = await axios.get(`/api/get/doctor/profile`,  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    setUserProfile(response.data[0]);
    seteditedUserProfile(response.data[0]);
  }
  catch (error) {
      
      console.log(error)
        setError('ERROR: Somethig went wrong');
    }
  }


  const fetchFacilitiesFromApi = async () => {
      const response = await axios.get(`/api/get/facilities`)
      return response.data;
  };

  // Function to fetch primary care provider options from API
  const fetchHealthFacilityName = async (inputValue) => {
    try {

      const data= await fetchFacilitiesFromApi()

      const transformedOptions = data.map((provider) => ({
        value: provider.id,
        label: provider.name,
      }));
      setHealthFacilityNameOptions(transformedOptions);
    } catch (error) {
      console.error('Error fetching primary care providers:', error);
    }
  };



  useEffect(() => {
    fetchHealthFacilityName();
    fetchUserProfile();
    
  }, []);

 useEffect(() => {
  console.log(healthfacilitynameoptions);
 },[healthfacilitynameoptions]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

const handleHealthFacilityChange = (selectedOption) => {
  console.log(editedUserProfile);
  console.log(UserProfile);
  seteditedUserProfile((prevState) => ({
    ...prevState,
    facility_id: selectedOption.value ,
    facility_name : selectedOption.label
  }));
};



  const handleSubmit = async(event) => {

    try {
      const response = await axios.post(`/api/update/doctor/profile`, editedUserProfile , {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          }); 
      setUserProfile(editedUserProfile);
    }
    catch (error) {
      console.error('Error fetching UserProfile records:', error);
    }
    
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
              <label htmlFor="email">Email:</label>
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
              <label htmlFor="gender">Gender: </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={editMode ? editedUserProfile.gender : UserProfile.gender}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

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
          </div>

          <div className="input-row">  
            
            <div>
              <label htmlFor="qualification">Qualification: </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={editMode ? editedUserProfile.qualification : UserProfile.qualification}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            <div>
              <label htmlFor="specialization">Specialization: </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={editMode ? editedUserProfile.specialization : UserProfile.specialization}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
          </div>

        <div className="input-row">  
          <div>
              <label htmlFor="licensenumber">License Number: </label>
              <input
                type="text"
                id="licensenumber"
                name="licensenumber"
                value={editMode ? editedUserProfile.licensenumber : UserProfile.licensenumber}
                onChange={handleInputChange}
                disabled={!editMode}
              />
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

        </div>

          <div>
          <label htmlFor="about">About *</label>
            <textarea
            id="about"
            name="about"
            value={editMode ? editedUserProfile.about : UserProfile.about}
            onChange={handleInputChange}
            disabled={!editMode}
            rows={4} 
          />
          </div>


      {editMode ? 
        <div>
          <label htmlFor="healthfacilityname">Health Facility Name *</label>
          <Select
            id="facility_id"
            name='facility_id'
            value={healthfacilitynameoptions.find(option => option.value === (editMode ? editedUserProfile.facility_id : UserProfile.facility_id))}
            onChange={handleHealthFacilityChange}
            options={healthfacilitynameoptions}
            style={{ "height": "0px"}}
            isSearchable
            isDisabled={!editMode}
              styles={{
              option: (provided) => ({
                ...provided,
                color: 'black', // Set the color to black
              }),
            }}
          />
        </div>
        :
          <div>
              <label htmlFor="address">Health Facility Name*</label>
              <input
                type="text"
                id="facility_name"
                name="facility_name"
                value={editMode ? editedUserProfile.facility_name : UserProfile.facility_name}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
    }



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
