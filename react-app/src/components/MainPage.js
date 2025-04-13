// components/MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="main-page">
      <div className="hero">
        <h1>Welcome to AcademicAssist</h1>
        <p>
          Connecting students and professors for research and teaching opportunities
          across campus. Find the perfect assistantship or recruit talented students
          for your projects.
        </p>
      </div>
      
      <div className="portal-options">
        <div className="portal-card">
          <h2>For Students</h2>
          <p>Find the perfect research or teaching opportunity to advance your academic career</p>
          <ul>
            <li>Browse open positions across all departments</li>
            <li>Upload your resume and academic profile</li>
            <li>Apply to opportunities with a single click</li>
            <li>Track your application status</li>
          </ul>
          <div className="portal-buttons">
            <Link to="/student" className="btn">Student Portal</Link>
          </div>
        </div>
        
        <div className="portal-card">
          <h2>For Professors</h2>
          <p>Find qualified assistants for your research projects and courses</p>
          <ul>
            <li>Post research and teaching assistantship opportunities</li>
            <li>Review student applications and qualifications</li>
            <li>Manage your current assistants</li>
            <li>Communicate directly with applicants</li>
          </ul>
          <div className="portal-buttons">
            <Link to="/professor" className="btn">Professor Portal</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;