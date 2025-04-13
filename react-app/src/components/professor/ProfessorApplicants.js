// components/professor/ProfessorApplicants.js
import React, { useState } from 'react';

function ProfessorApplicants({ professor, students, filters }) {
  // Mock data for opportunities
  const [opportunities, setOpportunities] = useState([
    { id: 1, title: 'Research Assistant - Machine Learning Lab' },
    { id: 2, title: 'Teaching Assistant - Introduction to Programming' }
  ]);
  
  // Filter students based on professor's research interests and positions
  const filteredStudents = students.filter(student => {
    const roleMatch = !filters.role || 
        student.desired_role.toLowerCase().includes(filters.role.toLowerCase());
    const interestMatch = !filters.interest || 
        student.research_interests.toLowerCase().includes(filters.interest.toLowerCase());
    return roleMatch && interestMatch;
  });
  
  // State for selected opportunity
  const [selectedOpportunity, setSelectedOpportunity] = useState(1);
  
  // Handle accepting an applicant
  const handleAccept = (applicantId) => {
    setOpportunities(prev => prev.map(opp => 
      opp.id === selectedOpportunity 
        ? { ...opp, acceptedApplicants: [...(opp.acceptedApplicants || []), applicantId] }
        : opp
    ));
  };
  
  // Handle rejecting an applicant
  const handleReject = (applicantId) => {
    setOpportunities(prev => prev.map(opp => 
      opp.id === selectedOpportunity 
        ? { ...opp, rejectedApplicants: [...(opp.rejectedApplicants || []), applicantId] }
        : opp
    ));
  };
  
  // Handle viewing applicant's resume
  const handleViewResume = (applicantId) => {
    alert(`Viewing resume for applicant ID: ${applicantId}`);
    // In a real application, this would open a modal or redirect to view the resume
  };

  return (
    <div className="tab-content">
      <h3>View Applicants</h3>
      <p>Review and manage student applications for your positions</p>
      
      <div className="form-group">
        <label htmlFor="select-opportunity">Select Opportunity</label>
        <select 
          id="select-opportunity"
          value={selectedOpportunity}
          onChange={(e) => setSelectedOpportunity(Number(e.target.value))}
        >
          {opportunities.map(opp => (
            <option key={opp.id} value={opp.id}>{opp.title}</option>
          ))}
        </select>
      </div>
      
      {filteredStudents.length === 0 ? (
        <div className="no-applicants">
          <p>No applicants found for this opportunity.</p>
        </div>
      ) : (
        filteredStudents.map(student => (
          <div className="applicant-card" key={student.id}>
            <div className="applicant-header">
              <div className="applicant-name">{student.name}</div>
              <div className="applicant-info">
                <span>{student.major}</span>
                <span>{student.education_level}</span>
              </div>
            </div>
            <div className="applicant-details">
              <p><strong>Desired Role:</strong> {student.desired_role}</p>
              <p><strong>Research Interests:</strong> {student.research_interests}</p>
              <p><strong>Skills:</strong> {student.skills.join(', ')}</p>
            </div>
            <div className="applicant-actions">
              <button onClick={() => handleViewResume(student.id)}>View Resume</button>
              <button onClick={() => handleAccept(student.id)}>Accept</button>
              <button onClick={() => handleReject(student.id)}>Reject</button>
            </div>
          </div>
        ))
      )}

      <style jsx>{`
        .tab-content {
          padding: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
        }
        .form-group select {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .applicant-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .applicant-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .applicant-name {
          font-size: 18px;
          font-weight: bold;
        }
        .applicant-info {
          color: #666;
        }
        .applicant-info span {
          margin-left: 10px;
        }
        .applicant-details {
          margin: 15px 0;
        }
        .applicant-details p {
          margin: 5px 0;
        }
        .applicant-actions {
          display: flex;
          gap: 10px;
        }
        .applicant-actions button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .applicant-actions button:first-child {
          background: #007bff;
          color: white;
        }
        .applicant-actions button:nth-child(2) {
          background: #28a745;
          color: white;
        }
        .applicant-actions button:last-child {
          background: #dc3545;
          color: white;
        }
        .no-applicants {
          text-align: center;
          padding: 20px;
          color: #666;
        }
      `}</style>
    </div>
  );
}

export default ProfessorApplicants;