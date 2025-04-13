// components/professor/ProfessorProfile.js
import React, { useState } from 'react';

function ProfessorProfile() {
  const [name, setName] = useState('Dr. Sarah Johnson');
  const [department, setDepartment] = useState('Computer Science');
  const [office, setOffice] = useState('Science Building, Room 305');
  const [researchAreas, setResearchAreas] = useState('Machine Learning, Natural Language Processing, Computer Vision');
  const [bio, setBio] = useState('I am a professor specializing in artificial intelligence and machine learning. My research focuses on developing novel algorithms for natural language understanding and computer vision applications.');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit to the backend
    console.log('Profile updated:', { name, department, office, researchAreas, bio });
    alert('Profile updated successfully!');
  };

  return (
    <div className="tab-content">
      <h3>Professor Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="professor-name">Full Name</label>
          <input 
            type="text" 
            id="professor-name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="professor-department">Department</label>
          <input 
            type="text" 
            id="professor-department" 
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="professor-office">Office Location</label>
          <input 
            type="text" 
            id="professor-office" 
            value={office}
            onChange={(e) => setOffice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="professor-research">Research Areas</label>
          <input 
            type="text" 
            id="professor-research" 
            value={researchAreas}
            onChange={(e) => setResearchAreas(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="professor-bio">Bio</label>
          <textarea 
            id="professor-bio" 
            placeholder="Tell students about your background, research interests, and the kind of work you do"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfessorProfile;