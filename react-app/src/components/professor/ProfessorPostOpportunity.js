// components/professor/ProfessorPostOpportunity.js
import React, { useState } from 'react';

function ProfessorPostOpportunity() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('research');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  
  // Skills state
  const [skillsList, setSkillsList] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  
  // Handle adding a skill
  const handleAddSkill = () => {
    if (currentSkill.trim() !== '' && !skillsList.includes(currentSkill.trim())) {
      setSkillsList([...skillsList, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };
  
  // Handle removing a skill
  const handleRemoveSkill = (skill) => {
    setSkillsList(skillsList.filter(s => s !== skill));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit to the backend
    console.log('New opportunity posted:', {
      title,
      type,
      description,
      requirements,
      deadline,
      skills: skillsList
    });
    alert('Opportunity posted successfully!');
    
    // Reset form
    setTitle('');
    setType('research');
    setDescription('');
    setRequirements('');
    setDeadline('');
    setSkillsList([]);
  };

  return (
    <div className="tab-content">
      <h3>Post New Opportunity</h3>
      <p>Create a new assistantship opportunity for students</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="opportunity-title">Position Title</label>
          <input 
            type="text" 
            id="opportunity-title" 
            placeholder="e.g. Research Assistant - Machine Learning Lab"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="opportunity-type">Position Type</label>
          <select 
            id="opportunity-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="research">Research Assistant</option>
            <option value="teaching">Teaching Assistant</option>
            <option value="lab">Lab Assistant</option>
            <option value="grader">Grader</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="opportunity-description">Description</label>
          <textarea 
            id="opportunity-description" 
            placeholder="Describe the position, responsibilities, and expectations"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="opportunity-requirements">Requirements</label>
          <textarea 
            id="opportunity-requirements" 
            placeholder="List any specific requirements, such as prior courses, GPA, experience, etc."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label>Required Skills</label>
          <div className="skills-input-group">
            <input 
              type="text" 
              placeholder="Add a required skill (e.g. Python, Data Analysis)"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
            />
            <button 
              type="button" 
              className="btn btn-outline add-skill-btn"
              onClick={handleAddSkill}
            >
              Add
            </button>
          </div>
          
          {skillsList.length > 0 && (
            <div className="tag-list">
              {skillsList.map((skill, index) => (
                <span className="tag" key={index}>
                  {skill}
                  <button 
                    type="button" 
                    className="tag-remove"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="opportunity-deadline">Application Deadline</label>
          <input 
            type="date" 
            id="opportunity-deadline" 
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn">Post Opportunity</button>
      </form>
    </div>
  );
}

export default ProfessorPostOpportunity;