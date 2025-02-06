import React, { useState, useEffect } from 'react';
import './CreateForum.css'; // Import your CSS file for HealthForums styling
import Navbar from '../navbar/Navbar';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import { useHistory, useNavigate } from 'react-router-dom';

const CreateForum = ({settings}) => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
  
  const handleSubmit = async () => {

        const data= {
          'title': title,
          'category': category,
          'description' : description,
          'user_id' : '1'
        }
        try {
        const response = await axios.post(`/api/create/forum` , data , {
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
        navigate('/forums')
  };


  return (
    <div className="container">
    <div>{error && <p className="error-message">{error}</p>}</div>
    <Navbar settings={settings}/>
      <div className="healthforum-form">
        <h1>Create New Forum</h1>
        <div className="form-group">
          <label htmlFor="email">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label htmlFor="category">Category *</label>
          <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          >

          <option value="">Select Category</option>
          <option value="Diet">Diet</option>
          <option value="Exercise">Exercise</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Sleep">Sleep</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Women's Health">Women's Health</option>
          <option value="Men's Health">Men's Health</option>
          <option value="Heart Health">Heart Health</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Fitness">Fitness</option>
          <option value="Stress Management">Stress Management</option>
          <option value="Allergies">Allergies</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Digestive Health">Digestive Health</option>
          <option value="Respiratory Health">Respiratory Health</option>
        </select>
        </div>

          <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={8} // Set the number of visible rows
          />
        </div>

        <div className="form-group">
          <button onClick={handleSubmit}>Submit</button>
        </div>
        
      </div>
    </div>
  );
}

export default CreateForum;