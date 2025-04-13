import React, { useState } from 'react';

function ProfessorOpportunities() {
  // Mock data for job postings
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: 'Research Assistant - Machine Learning Lab',
      type: 'Research Assistant',
      status: 'Active',
      applications: 5,
      deadline: 'May 15, 2025',
      description: 'Looking for a research assistant to help with ongoing projects in natural language processing and computer vision.',
      skills: ['Python', 'Machine Learning', 'Deep Learning']
    },
    {
      id: 2,
      title: 'Teaching Assistant - Introduction to Programming',
      type: 'Teaching Assistant',
      status: 'Active',
      applications: 3,
      deadline: 'April 30, 2025',
      description: 'Seeking a teaching assistant for the Fall 2025 semester to help with grading and office hours.',
      skills: ['Java', 'C++', 'Programming']
    }
  ]);
  
  const handleDeactivate = (jobId) => {
    setJobPostings(jobPostings.map(job => 
      job.id === jobId ? { ...job, status: 'Inactive' } : job
    ));
  };
  
  const handleActivate = (jobId) => {
    setJobPostings(jobPostings.map(job => 
      job.id === jobId ? { ...job, status: 'Active' } : job
    ));
  };
  
  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this posting?')) {
      setJobPostings(jobPostings.filter(job => job.id !== jobId));
    }
  };

  return (
    <div className="tab-content">
      <h3>Manage Opportunities</h3>
      <p>View and manage your assistantship postings</p>
      
      {jobPostings.map(job => (
        <div className="job-listing" key={job.id}>
          <div className="job-header">
            <div>
              <div className="job-title">{job.title}</div>
              <div className="job-meta">
                <span>{job.type}</span>
                <span className={`status-badge ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
              </div>
            </div>
            <div className="job-stats">
              <div className="stat">
                <span className="stat-label">Applications</span>
                <span className="stat-value">{job.applications}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Deadline</span>
                <span className="stat-value">{job.deadline}</span>
              </div>
            </div>
          </div>
          <div className="job-description">
            {job.description}
          </div>
          <div className="job-requirements">
            <div className="requirement-title">Required Skills</div>
            <div className="tag-list">
              {job.skills.map((skill, index) => (
                <span className="tag" key={index}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="action-buttons">
            {job.status === 'Active' ? (
              <button 
                className="btn btn-outline"
                onClick={() => handleDeactivate(job.id)}
              >
                Deactivate
              </button>
            ) : (
              <button 
                className="btn btn-outline"
                onClick={() => handleActivate(job.id)}
              >
                Activate
              </button>
            )}
            <button 
              className="btn btn-danger"
              onClick={() => handleDelete(job.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfessorOpportunities;