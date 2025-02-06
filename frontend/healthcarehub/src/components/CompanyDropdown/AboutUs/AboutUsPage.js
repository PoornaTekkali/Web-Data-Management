import React from 'react';
import './AboutUsPage.css'; // Import CSS file for styling
import Navbar from '../../navbar/Navbar';
import profile from './../../../assets/profile.png'
import woman from './../../../assets/woman.png'

function AboutUsPage({settings}) {
  return (
    <div className='about-container'>
        <Navbar settings={settings}/>
        <div className="about-us-container">
      <div className="section">
        <h1>About SmartHealth Hub</h1>
        <p>SmartHealth Hub is a revolutionary platform dedicated to providing innovative healthcare solutions to improve patient care and streamline healthcare operations.</p>
      </div>
      <div className="section">
        <h2>Our Mission</h2>
        <p>Our mission is to empower healthcare providers, patients, and stakeholders by leveraging cutting-edge technology to deliver accessible, efficient, and personalized healthcare services.</p>
      </div>
      <div className="section">
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={profile} alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src={profile}  alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>CTO</p>
          </div>
          <div className="team-member">
            <img src={profile}  alt="Team Member 3" />
            <h3>Michael Johnson</h3>
            <p>Lead Developer</p>
          </div>
          <div className="team-member">
            <img src={profile}  alt="Team Member 4" />
            <h3>Emily Brown</h3>
            <p>UX Designer</p>
          </div>
          <div className="team-member">
            <img src={profile}  alt="Team Member 5" />
            <h3>David Wilson</h3>
            <p>Marketing Manager</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AboutUsPage;
