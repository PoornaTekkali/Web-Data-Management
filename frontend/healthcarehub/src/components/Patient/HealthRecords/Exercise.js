import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Exercise() {
  const [exercises, setexercises] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem('token');
  const [successMessage, setSuccessMessage] = useState('');


  const fetchExercises = async () => {
    try {

      const response = await axios.get('/api/get/exercise/healthrecords',  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });

      console.log(response.data);
      setexercises(response.data);


    } catch (error) {
      console.error('Error fetching health records:', error);
    }
  };


useEffect(() => {
    fetchExercises();
  }, []);



  const handleRemoveExercise = async (index,id) => {

  try {
    if(id){
      const response = await axios.delete(`/api/delete/exercise/healthrecord/${id}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout  // Set timeout to 2 seconds
    });
    }
    const updatedexercise = [...exercises];
    updatedexercise.splice(index, 1);
    setexercises(updatedexercise);

    } catch (error) {
      console.error('Error fetching health records:', error);
    }

  };

  const handleInputChange = (event, index, key) => {
    const updatedexercise = [...exercises];
    updatedexercise[index][key] = event.target.value;
    setexercises(updatedexercise);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('exercises history:', exercises);
  };

   

  const handleAddExercise = () => {
    const exercise = { name: '', date: '', editable: true };
    setexercises([...exercises, exercise]);
    setEditMode(true); // Enable edit mode for the newly added illness
  };


  const handleSave = async (id) => {
    try {
      const data=exercises[id];
      const response = await axios.post('/api/create/exercise/healthrecord', data,  {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: process.env.timeout 
      });
      


    // Remove the saved exercise from the list
    const updatedExercises = exercises.filter((exercise, index) => index !== id);
    // Add the response data (saved exercise) to the list
    updatedExercises.push(response.data);

    // Update the exercises state with the modified list
    setexercises(updatedExercises);
        setSuccessMessage("Added successfully");
    setTimeout(() => {
            setSuccessMessage('');
        }, 2000); 
      

    } 
    catch (error) {
      console.error('Error fetching health records:', error);
    }




  };

  return (
    <div className="exercises">
      <h2>Exercise Tracking</h2>
      <form onSubmit={handleSubmit}>
        <h3>Exercise records</h3>
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index}>
              <label htmlFor={`workout-${index}`}>WorkOut:</label>
              <input
                id={`workout-${index}`}
                type="text"
                value={exercise.workout}
                onChange={(e) => handleInputChange(e, index, 'workout')}
                disabled={!exercise.editable}
                className={exercise.editable ? "editable" : ""}
              />

              <br />
              <label htmlFor={`duration-${index}`}>Duration:</label>
              <input
                id={`duration-${index}`}
                type="text"
                value={exercise.duration}
                onChange={(e) => handleInputChange(e, index, 'duration')}
                disabled={!exercise.editable}
                className={exercise.editable ? "editable" : ""}
              />

              <br />
              <label htmlFor={`date-${index}`}>Date:</label>
              <input
                id={`date-${index}`}
                type="text"
                value={exercise.date}
                onChange={(e) => handleInputChange(e, index, 'date')}
                disabled={!exercise.editable}
                className={exercise.editable ? "editable" : ""}
              />

              <label htmlFor={`intensity-${index}`}>Intensity:</label>
              <input
                id={`intensity-${index}`}
                type="text"
                value={exercise.intensity}
                onChange={(e) => handleInputChange(e, index, 'intensity')}
                disabled={!exercise.editable}
                className={exercise.editable ? "editable" : ""}
              />
              <button type="button" onClick={() => handleRemoveExercise(index,exercise.id)}>Remove</button>
              {exercise.editable &&  <button type="button" onClick={() => handleSave(index)}>Save</button>}
              
            </li>
          ))}
        </ul>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <button type="button"  style={{"width":"100%" , "margin-bottom": "30%"}}  onClick={handleAddExercise}>Add</button>
      </form>
    </div>
  );
}

export default Exercise;
