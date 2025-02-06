import React, { useState, useEffect } from 'react';
import './IncidentResponse.css'; // Import CSS file for styling
import axios from 'axios';

function IncidentResponse() {
  const [viewincidentClicked, setviewpincidentClicked] = useState([]);
    const [ reply , setReply] = useState('');
    const [ comments , setComments] = useState([]);
    const [successMessages, setSuccessMessages] = useState({});
    const [incidents , setIncidents] = useState([]);
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);




  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
    const response = await axios.get('/api/get/support/incident_response',  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    setIncidents(response.data);
  }
  catch (error) { 
      console.log(error)
        setError('ERROR: Somethig went wrong');
    }
  }
  fetchDataFromApi();

  }, []);

const fetchCommentsFromApi = async (complianceId) => {
try {
      const response = await axios.get(`/api/get/support/comments/${complianceId}`,  {
              headers: {
                'Authorization': `Bearer ${token}`
              },
              timeout: process.env.timeout  // Set timeout to 2 seconds
            });
      setComments(response.data);
  }
  catch (error) { 
      console.log(error)
        setError('ERROR: Somethig went wrong');
  }
}


const storeComments = async (id , message) => {
try {
  const data={
    support_id:id,
    message:message
  }
      const response = await axios.post(`/api/create/support/comment`, data , {
              headers: {
                'Authorization': `Bearer ${token}`
              },
              timeout: process.env.timeout  // Set timeout to 2 seconds
            });
      return response.data[0];
  }
  catch (error) { 
      console.log(error)
        setError('ERROR: Somethig went wrong');
  }
};



const CloseSupport = async (Id) => {
  try {
  const response = await axios.get(`/api/close/support/issues/${Id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
}
catch (error) { 
      console.log(error)
        setError('ERROR: Somethig went wrong');
  }

};


  const Onsubmit = async (id) => {
    if (reply!=''){
    const newComment = await storeComments(id,reply);
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    console.log(comments)
    setReply('');
  }
};

  const handleresolveincidentClicked =(Id) => { 
    CloseSupport(Id);
    const newSuccessMessages = { ...successMessages };
    newSuccessMessages[Id] = "Resolved Successfully";
    setSuccessMessages(newSuccessMessages);

    setTimeout(() => {
        const newSuccessMessages = { ...successMessages };
        delete newSuccessMessages[Id];
        setSuccessMessages(newSuccessMessages);
    }, 2000); 

  
  const updatedIncidents = incidents.map(incident => {
    if (incident.id === Id) {
      return { ...incident, status: 'Closed' }; // Create a new object with updated status
    }
    return incident; // Return other compliances as they are
  });

  // Update the state with the updated compliances
  setIncidents(updatedIncidents);
};



const handleviewincidentClicked = (incidentId) => {
  setviewpincidentClicked((prevClicked) => {
    const newClicked = [...prevClicked];

    // Iterate through all compliance IDs
    for (let i = 0; i < newClicked.length; i++) {
      // Set the previously clicked compliance to false
      if (i !== incidentId && newClicked[i] === true) {
        newClicked[i] = false;
      }
    }

    // Toggle the clicked compliance
    newClicked[incidentId] = !newClicked[incidentId];

    // Fetch comments for the clicked compliance
    fetchCommentsFromApi(incidentId);

    return newClicked;
  });
};

return (
  <div className="incident-response-container">
    <h1>Incident Response</h1>
    <div className="incident-list">
      <h2>Incident List</h2>
      <div>{error && <p className="error-message">{error}</p>}</div>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <div className="incident-details">
              <h3>{incident.title}</h3>
              <p><strong>Severity:</strong> {incident.severity}</p>
              <p><strong>Status:</strong> {incident.status}</p>
              <p><strong>Description:</strong> {incident.description}</p>
              <p><strong>Timestamp:</strong> {incident.created_at ? new Date(incident.created_at).toISOString().split('T')[0] : "Invalid Date"}</p>
              {viewincidentClicked[incident.id] && (
                <div>
                  <h2>Comments</h2>
                  {comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <span className="comment-user">{comment.user.firstname} {comment.user.lastname}: </span>
                      <span className="comment-message">{comment.message}</span>
                    </div>
                  ))}
                  {incident.status === "Open" && (
                  <div className="form-group">
                    <h2>Reply</h2>
                    <textarea
                      id="reply"
                      value={reply}
                      onChange={e => setReply(e.target.value)}
                      rows={3} 
                    />
                    <button onClick={() => Onsubmit(incident.id)}>Submit</button>
                  </div>
                  )}
                </div>
              )}
              {!viewincidentClicked[incident.id] && (
                <div>
                <button onClick={() => handleviewincidentClicked(incident.id)}>View Comments</button>
                <div>{successMessages[incident.id] && <p className="success-message">{successMessages[incident.id]}</p>} </div>

                {incident.status === "Open" && (
                    <button onClick={() => handleresolveincidentClicked(incident.id)}>Mark as Resolved</button>
                )}
                
                </div>
              )} 
              {viewincidentClicked[incident.id] && (
                <button onClick={() => handleviewincidentClicked(incident.id)}>Close</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}

export default IncidentResponse;
