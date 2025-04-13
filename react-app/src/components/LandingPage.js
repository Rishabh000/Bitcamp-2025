import React from 'react';

function LandingPage({ navigateToStudent, navigateToProfessor }) {
  return (
    <div className="main-page">
      <div className="hero">
        <h1>Welcome to the Academic Portal</h1>
        <p>Connect professors and students for assistantship opportunities, research collaborations, and more.</p>
      </div>
      
      <div className="portal-options">
        <div className="portal-card">
          <img src="/images/student-icon.png" alt="Student Icon" />
          <h2>Student Portal</h2>
          <p>Find assistantship opportunities that match your skills and interests.</p>
          <ul>
            <li>Upload your resume</li>
            <li>Select your interests and skills</li>
            <li>Add relevant coursework</li>
            <li>Apply for positions</li>
          </ul>
          <div className="portal-buttons">
            <button className="btn" onClick={() => navigateToStudent('login')}>Login</button>
            <button className="btn btn-outline" onClick={() => navigateToStudent('register')}>Register</button>
          </div>
        </div>
        
        <div className="portal-card">
          <img src="/images/professor-icon.png" alt="Professor Icon" />
          <h2>Professor Portal</h2>
          <p>Find qualified students for your assistantship positions.</p>
          <ul>
            <li>Post assistantship opportunities</li>
            <li>Define required skills and interests</li>
            <li>Review student applications</li>
            <li>Manage your positions</li>
          </ul>
          <div className="portal-buttons">
            <button className="btn" onClick={() => navigateToProfessor('login')}>Login</button>
            <button className="btn btn-outline" onClick={() => navigateToProfessor('register')}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;