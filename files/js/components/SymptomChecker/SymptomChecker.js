import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SymptomChecker.css';
import Navbar from '../navbar/Navbar';
import Select from 'react-select';


const SymptomChecker = ({ settings }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [potentialIssues, setPotentialIssues] = useState([]);

  const fetchDataFromApi = async (url) => {
    try {
      const response = await axios.get(url, {
        timeout: process.env.timeout
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDisease = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        timeout: process.env.timeout
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromApi('/api/get/symptoms');
      const transformedOptions = data.map((provider) => ({
        value: provider.id,
        label: provider.name,
      }));
      setSymptoms(transformedOptions);
    };
    fetchData();
  }, []);

  const handleSymptomChange = (selectedOption) => {
  setPotentialIssues([])
  const updatedSymptoms = symptoms.filter(option => option !== selectedOption);
  setSymptoms(updatedSymptoms);
  setSelectedSymptoms([...selectedSymptoms, selectedOption]);
}


  const handleRemoveSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    setPotentialIssues([])
  };

  const checkSymptoms = async () => {
    const selectedLabels = selectedSymptoms.map(symptom => symptom.label);
    const data = await fetchDisease('/api/get/diseases', { 'symptoms' : selectedLabels });
    setPotentialIssues(data);
  };

  return (
    <div className="symptoms-container">
      <Navbar settings={settings} />
      <div className="symptomchecker-container">
        <h1>Symptom Checker</h1>
        <div>
          <label htmlFor="symptom">Select a symptom:</label>
          <Select
            id="symptoms"
            name="symptoms"
            value=''
            onChange={handleSymptomChange}
            options={symptoms}
            style={{ height: '0px' }}
            isSearchable
            styles={{
              option: (provided) => ({
                ...provided,
                color: 'black', // Set the color to black
              }),
            }}
          />
        </div>
        <div className="added-symptoms-list">
          <h2>Symptoms Added:</h2>
          <ul>
            {selectedSymptoms.map((symptom, index) => (
              <li key={index}>
                <button onClick={() => handleRemoveSymptom(symptom)} style={{ "width":"20%"}}>Remove</button>
                {symptom.label}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={checkSymptoms}>Check Symptoms</button>
        {potentialIssues.length > 0 && (
          <div className="scrollable-container">
            <h2>Potential Issues:</h2>
            <form>
              <ul>
              <hr />

          {potentialIssues.map((issue, index) => (
            <div key={index} className="scrollable-container">
              <h3 className="issue-name">Name: {issue.name}</h3>
              <p className="issue-description"><b>Description:</b> {issue.description}</p>
              <p className="issue-precautions"><b>Precautions:</b> {issue.precautions}</p>
              {index < potentialIssues.length - 1 && <hr className="issue-divider" />}
            </div>
          ))}
          <hr />
              </ul>
            </form>
          </div>
        )}
        <div className="disclaimer">
          **Disclaimer:**
          <p>
            This is a tool for informational purposes only and should not be a substitute for professional medical
            advice. Always consult with a healthcare provider if you have any concerns about your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
