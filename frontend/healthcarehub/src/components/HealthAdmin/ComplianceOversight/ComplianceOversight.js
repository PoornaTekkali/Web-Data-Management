import React, { useState, useEffect } from 'react';
import './ComplianceOversight.css'; // Import CSS file for styling
import axios from 'axios';


function ComplianceOversight() {

  const [viewcomplianceClicked, setviewpcomplianceClicked] = useState([]);
    const [ reply , setReply] = useState('');
    const [ comments , setComments] = useState([]);
    const [successMessages, setSuccessMessages] = useState({});
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const [Compliances, setCompliances] = useState([]);
    


  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
    const response = await axios.get('/api/get/support/compliance_issues',  {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    setCompliances(response.data);
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



const handleviewcomplianceClicked = (complianceId) => {
  setviewpcomplianceClicked((prevClicked) => {
    const newClicked = [...prevClicked];

    // Iterate through all compliance IDs
    for (let i = 0; i < newClicked.length; i++) {
      // Set the previously clicked compliance to false
      if (i !== complianceId && newClicked[i] === true) {
        newClicked[i] = false;
      }
    }

    // Toggle the clicked compliance
    newClicked[complianceId] = !newClicked[complianceId];

    // Fetch comments for the clicked compliance
    fetchCommentsFromApi(complianceId);

    return newClicked;
  });
};




  const Onsubmit = async (id) => {
    if (reply!=''){
    const newComment = await storeComments(id,reply);
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setReply('');
  }
};

  
const handleresolvecomplianceClicked =(complianceId) => { 

    CloseSupport(complianceId);
    const newSuccessMessages = { ...successMessages };
    newSuccessMessages[complianceId] = "Resolved Successfully";
    setSuccessMessages(newSuccessMessages);

    setTimeout(() => {
        const newSuccessMessages = { ...successMessages };
        delete newSuccessMessages[complianceId];
        setSuccessMessages(newSuccessMessages);
    }, 2000); 

  
  const updatedCompliances = Compliances.map(compliance => {
    if (compliance.id === complianceId) {
      return { ...compliance, status: 'Closed' }; // Create a new object with updated status
    }
    return compliance; // Return other compliances as they are
  });

  // Update the state with the updated compliances
  setCompliances(updatedCompliances);
};




return (
  <div className="compliance-response-container">
    <h1>Compliances</h1>
    <div className="compliance-list">
      <h2>Compliances List</h2>
      <div>{error && <p className="error-message">{error}</p>}</div>
      <ul>
        {Compliances.map(compliance => (
          <li key={compliance.id}>
            <div className="compliance-details">
              <h3>{compliance.title}</h3>
              <p><strong>Severity:</strong> {compliance.severity}</p>
              <p><strong>Status:</strong> {compliance.status}</p>
              <p><strong>Description:</strong> {compliance.description}</p>
              <p><strong>Timestamp:</strong> {compliance.created_at ? new Date(compliance.created_at).toISOString().split('T')[0] : "Invalid Date"}</p>
              {viewcomplianceClicked[compliance.id] && (
                <div>
                  <h2>Comments</h2>
                  {comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <span className="comment-user">{comment.user.firstname} {comment.user.lastname} : </span>
                      <span className="comment-message">{comment.message}</span>
                      <br/>
                    </div>
                  ))}
                  {compliance.status === "Open" && (
                    <div className="form-group">
                      <h2>Reply</h2>
                      <textarea
                        id="reply"
                        value={reply}
                        onChange={e => setReply(e.target.value)}
                        rows={3} 
                      />
                      <button onClick={() => Onsubmit(compliance.id)}>Submit</button>
                    </div>
                  )}
                </div>
              )}
              {!viewcomplianceClicked[compliance.id] && (
                <div>
                <button onClick={() => handleviewcomplianceClicked(compliance.id)}>View Comments</button>
                <div>{successMessages[compliance.id] && <p className="success-message">{successMessages[compliance.id]}</p>} </div>
                {compliance.status === "Open" && (
                    <button onClick={() => handleresolvecomplianceClicked(compliance.id)}>Mark as Resolved</button>
                )}                
                </div>
              )} 
              {viewcomplianceClicked[compliance.id] && (
                <button onClick={() => handleviewcomplianceClicked(compliance.id)}>Close</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}

export default ComplianceOversight;
