import React, { useState, useEffect } from 'react';
import './Forum.css'; // Import your CSS file for HealthForums styling
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import male_doctor from './../../assets/male_doctor.png'
import user_icon from './../../assets/profile.png'
import { useHistory, useNavigate } from 'react-router-dom';


const ForumPage = ({settings}) => {
  const [Forum, setForum] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [ answer , setAnswer] = useState('');
  const [ answer_section , setAnswer_section] = useState(false);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);


  const { forumId } = useParams(); // Get the forumId from the URL parameter


    const fetchDataFromApi = async (url) => {
    const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });
    return response.data;
  };

  useEffect(() => 
  {
        const fetchForum = async () => {
          try {
            const data = await fetchDataFromApi(`/api/get/forum/${forumId}`);
            setForum(data[0]);
        }
          catch (error) {
          console.log(error)
          setError('ERROR: Somethig went wrong');
        }
      }

        const fetchForumAnswers = async () => {
          try {
            const data = await fetchDataFromApi(`/api/get/forum/answers/${forumId}`);
            setAnswers(data);
        }
          catch (error) {
        console.log(error)
        setError('ERROR: Somethig went wrong');
      }
    }


        fetchForum();
        fetchForumAnswers();
    }, [forumId]);






  const navigate = useNavigate();

  const handleAnswerClick = () => {
      setAnswer_section(!answer_section)
    };

  const handleSubmitClick = async () => {

    if(answer){

        const data= {
          'answer': answer,
          'forum_id': forumId,
          'user_id' : 1,
          'user_firstname' : 'Admin'
        }
        
        try {

        const response = await axios.post(`/api/create/forum/answer` , data, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            timeout: process.env.timeout  // Set timeout to 2 seconds
          });

        const updatedAnswers = [response.data.post[0], ...answers];
        setAnswers(updatedAnswers);
        setAnswer('');
        setAnswer_section(false);
      }
      catch (error) {
      console.log(error)
      setError('ERROR: Somethig went wrong');
    }

  }
};
  
  return (
    <div className="forum-container">
      <Navbar settings={settings}/>      
      <div className="forum-list">
      <div>{error && <p className="error-message">{error}</p>}</div>
        {Forum && (
          <div className="forum-card">
            <div className="left-section">
              <div style={{ paddingLeft: '20px' }}>
                <h2>{Forum.title} {Forum.user_id}</h2>
                <p>Category: {Forum.category}</p>
                <p>{Forum.created_at ? new Date(Forum.created_at).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, year: 'numeric', month: '2-digit', day: '2-digit' }) : "Invalid Date"}</p>
                <p className="description">{Forum.description}</p>
              </div>
            </div>
          </div>
        )}
        <div className="answers-container">
        {!answer_section && <button onClick={handleAnswerClick} style={{ "width":"25%"}} > Comment </button>}
        
        
        {(
            answer_section
          ) && ( 
        <div className="answer-section">
        <div className="form-group">
        <h2> Your Comments </h2>
        
        
          <textarea
            id="answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            rows={8} 
          />
          <button onClick={handleAnswerClick} style={{ "width":"25%"}} > Close </button>
          <button onClick={handleSubmitClick} style={{ "width":"25%"}} > Submit </button>
        </div>
        </div>
        )}
        
          <h2>Comments:</h2>
          <ul>
            {answers.map((answer, index) => (
              <div className="answer">
              <img src={user_icon} alt="user icon" className="profile-pic" style={{ width: '50px', height: '50px' }} />
              <label> {answer.user_firstname} {answer.user_lastname}  </label>

              <p key={index}>{answer.answer}</p>
              <p> {answer.created_at ? new Date(answer.created_at).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, year: 'numeric', month: '2-digit', day: '2-digit' }) : "Invalid Date"}</p>
              </div>

            ))}
          </ul>
        </div>
      </div> 
    </div>
  );
};

export default ForumPage;
