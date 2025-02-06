
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ShareSettings() {
  const [selectedRole, setSelectedRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');



const DeleteUser = (user) => {
  console.log(user)
  console.log(searchResults);
  const updatedsearchResults = searchResults.filter((searchResult) =>
    searchResult.id !== user.id
  );
  setSearchResults(updatedsearchResults);
};



const handleShare = async(user) => {
    try {
      const data = {
        shared_user_id: user.user_id,
        role: user.role
      }
      const response = await axios.post('/api/create/share/records', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
    setSuccessMessage("Shared  Successfully");
    setTimeout(() => {
            setSuccessMessage('');

        }, 1000); 
      
    } 
    catch (error) {
      console.error('Error fetching health records:', error);
    }
}


const handledelete = async(user) => {
    try {
      const data = {
        shared_user_id: user.shared_user_id ,
        role: user.role
      }
      const response = await axios.post('/api/delete/share/records', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
      DeleteUser(user)
    setSuccessMessage("Share Deleted Successfully");
    setTimeout(() => {
            setSuccessMessage('');

        }, 1000); 
      
    } 
    catch (error) {
      console.error('Error fetching health records:', error);
    }
}

    const fetchdata = async (url) => {
    const response = await axios.get(url,  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    return response.data
  }
  

  const handleRoleSelection = async (role) => {
    await setSelectedRole(role);
    setSearchResults([]);
        if(role==='SharedUser'){
      handleSearch()
    }

     if(role === 'SharedUser') {
      try {
            const data = await fetchdata(`/api/get/share/users`);
            setError('')
            setSearchResults(data);
          } 
          catch (error) {
            setError('Failed to get users')
            setSuccessMessage('')
            console.error('Error fetching users:', error);
          }


    }
  };




  const handleSearch = async () => {


    const results = []; // Placeholder for search results


    if (selectedRole === 'doctor') {
      try {
            const data = await fetchdata(`/api/search/doctors?name=${searchQuery}`);
            setError('')
            setSearchResults(data);
          } 
          catch (error) {
            setError('Failed to get users')
            setSuccessMessage('')
            console.error('Error fetching users:', error);
          }
    } else if (selectedRole === 'pharmacist') {
      try {
            const data = await fetchdata(`/api/search/pharmacists?name=${searchQuery}`);
            setError('')
            setSearchResults(data);
          } 
          catch (error) {
            setError('Failed to get users')
            setSuccessMessage('')
            console.error('Error fetching users:', error);
          }


    }



    
  };

  return (
    <div className='appointment-list'>
      <h1>Share you Records </h1>
      <button onClick={() => handleRoleSelection('SharedUser')}>Shared User </button>
      <button onClick={() => handleRoleSelection('doctor')}>Doctor</button>
      <button onClick={() => handleRoleSelection('pharmacist')}>Pharmacist</button>

      {selectedRole  &&  (
        <div>

        {selectedRole!=='SharedUser'  &&  (
          <div>
          <h2>Search for {selectedRole}:</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedRole}s...`}
              onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
          />
          <button onClick={handleSearch}>Search</button>
          </div>
          )}

          <div className='user-list'>
            <h3>{selectedRole}'s:</h3>
            <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
            <div>{error && <p className="error-message">{error}</p>}</div>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>
                  {/* Render search results based on selected role */}

                  {selectedRole === 'doctor' ? (
                  <div>
                      <p>Name: {result.firstname} {result.lastname}</p>
                      <p>Email: {result.email}</p>
                      <p>Specialty: {result.specialization}</p>
                      <button onClick={() => handleShare(result)}>Share</button>
                  </div>

                ) : selectedRole === 'pharmacist' ? (
                  <div>
                      <p>Name: {result.firstname} {result.lastname}</p>
                      <p>Email: {result.email}</p>
                      <p>Address: {result.address}</p>
                      <button onClick={() => handleShare(result)}>Share</button>

                    </div>
                ) : (
                  <div>
                      <p>Name: {result.firstname} {result.lastname}</p>
                      <p>Email: {result.email}</p>
                      <p>Role: {result.role}</p>
                      <button onClick={() => handledelete(result)}>Delete</button>
                  </div>
                )}
                  
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShareSettings;
