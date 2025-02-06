import React, { useState } from 'react';
import './ContactUs.css'; // Import CSS file for styling
import Navbar from '../navbar/Navbar';

function ContactUs({settings}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {

    setSuccessMessage("Submitted Successfully");
    setTimeout(() => {
            setSuccessMessage('');
        }, 2000); 
    e.preventDefault();
    // Send form data to backend or email service
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className='contact-container'>
      <Navbar settings={settings}/>
      <div className="contact-form-container">
        <h1>Contact Us</h1>
        <div>{successMessage && <p className="success-message">{successMessage}</p>} </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;