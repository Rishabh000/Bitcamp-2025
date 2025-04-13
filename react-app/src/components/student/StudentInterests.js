import React, { useState } from 'react';

function StudentInterests() {
  // Technical skills state
  const [skills, setSkills] = useState({
    programming: true,
    dataAnalysis: true,
    webDevelopment: true,
    machineLearning: false,
    database: false,
    statistics: false
  });
  
  // Research interests state
  const [interests, setInterests] = useState({
    ai: true,
    security: false,
    hci: true,
    networks: false,
    software: false
  });
  
  // Coursework state
  const [coursework, setCoursework] = useState(
    'CS101: Introduction to Computer Science, CS201: Data Structures, CS301: Algorithms, CS401: Software Engineering'
  );
  
  // Handle skills change
  const handleSkillChange = (skill) => {
    setSkills({
      ...skills,
      [skill]: !skills[skill]
    });
  };
  
  // Handle interests change
  const handleInterestChange = (interest) => {
    setInterests({
      ...interests,
      [interest]: !interests[interest]
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit to the backend
    console.log('Interests and skills updated:', { skills, interests, coursework });
    alert('Interests and skills updated successfully!');
  };

  return (
    <div className="tab-content">
      <h3>Skills & Interests</h3>
      <p>Select your skills and interests to help match you with appropriate opportunities.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Technical Skills</label>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="skill-programming"
                checked={skills.programming}
                onChange={() => handleSkillChange('programming')}
              />
              <label htmlFor="skill-programming">Programming</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="skill-data-analysis"
                checked={skills.dataAnalysis}
                onChange={() => handleSkillChange('dataAnalysis')}
              />
              <label htmlFor="skill-data-analysis">Data Analysis</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="skill-web-development"
                checked={skills.webDevelopment}
                onChange={() => handleSkillChange('webDevelopment')}
              />
              <label htmlFor="skill-web-development">Web Development</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="skill-machine-learning"
                checked={skills.machineLearning}
                onChange={() => handleSkillChange('machineLearning')}
              />
              <label htmlFor="skill-machine-learning">Machine Learning</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="skill-database"
                checked={skills.database}
                onChange={() => handleSkillChange('database')}
              />
              <label htmlFor="skill-database">Database Management</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="skill-statistics"
                checked={skills.statistics}
                onChange={() => handleSkillChange('statistics')}
              />
              <label htmlFor="skill-statistics">Statistics</label>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>Research Interests</label>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="interest-ai"
                checked={interests.ai}
                onChange={() => handleInterestChange('ai')}
              />
              <label htmlFor="interest-ai">Artificial Intelligence</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="interest-security"
                checked={interests.security}
                onChange={() => handleInterestChange('security')}
              />
              <label htmlFor="interest-security">Cybersecurity</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="interest-hci"
                checked={interests.hci}
                onChange={() => handleInterestChange('hci')}
              />
              <label htmlFor="interest-hci">Human-Computer Interaction</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="interest-networks"
                checked={interests.networks}
                onChange={() => handleInterestChange('networks')}
              />
              <label htmlFor="interest-networks">Computer Networks</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="interest-software"
                checked={interests.software}
                onChange={() => handleInterestChange('software')}
              />
              <label htmlFor="interest-software">Software Engineering</label>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="student-courses">Relevant Coursework</label>
          <textarea 
            id="student-courses" 
            placeholder="List relevant courses you've completed, separated by commas"
            value={coursework}
            onChange={(e) => setCoursework(e.target.value)}
          ></textarea>
        </div>
        
        <button type="submit" className="btn">Save Changes</button>
      </form>
    </div>
  );
}

export default StudentInterests;