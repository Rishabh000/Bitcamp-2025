import React, { useState } from 'react';

function StudentProfile() {
  const [name, setName] = useState('John Doe');
  const [program, setProgram] = useState('Computer Science');
  const [year, setYear] = useState('3');
  const [bio, setBio] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit to the backend
    console.log('Profile updated:', { name, program, year, bio });
    alert('Profile updated successfully!');
  };

  return (
    <div className="tab-content">
      <h3>Personal Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student-name">Full Name</label>
          <input 
            type="text" 
            id="student-name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="student-program">Program/Major</label>
          <input 
            type="text" 
            id="student-program" 
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="student-year">Year of Study</label>
          <select 
            id="student-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">Graduate Student</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="student-bio">Bio</label>
          <textarea 
            id="student-bio" 
            placeholder="Tell us about yourself, your academic interests, and career goals"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn">Save Changes</button>
      </form>
    </div>
  );
}

export default StudentProfile;