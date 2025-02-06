import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './ForgotPassword.css'; // Import your custom CSS for styling
import Navbar from './../navbar/Navbar'

function ForgotPassword({settings}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      // Validate email format (You can use a library like validator.js for more robust validation)
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Implement forgot password logic here (e.g., API call to send reset email)
      // Replace the simulated API call with your actual API call
      const response = await sendResetEmail(email);

      if (response.success) {
        setSuccessMessage('Password reset email sent successfully!');
        setError(null);
      } else {
        setError(response.error || 'An error occurred. Please try again later.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  const validateEmail = (email) => {
    // Basic email format validation (You can use a library like validator.js for more robust validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendResetEmail = async (email) => {
    // Simulated API call to send reset email
    return new Promise((resolve, reject) => {
      // Simulate success
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  return (
    <div className="container">
    <Navbar settings={settings}/>
      <div className="forgot-password-form">
        <h1>Forgot your password?</h1>
        <div>{error && <p className="error-message">{error}</p>}</div>
        <div>{successMessage && <p className="success-message">{successMessage}</p>}</div>
        <div className="form-group">
          <label htmlFor="email">Enter your email for resetting your password</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleForgotPassword} >Send Reset Email</button>
        <div className="form-links">
          <span>Remembered your password ? </span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
