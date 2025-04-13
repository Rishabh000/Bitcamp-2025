// components/professor/ProfessorDashboard.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfessorProfile from './ProfessorProfile';
import ProfessorOpportunities from './ProfessorOpportunities';
import ProfessorPostOpportunity from './ProfessorPostOpportunity';
import ProfessorApplicants from './ProfessorApplicants';

function ProfessorDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange('profile')}
        >
          My Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => handleTabChange('opportunities')}
        >
          Manage Opportunities
        </button>
        <button 
          className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => handleTabChange('post')}
        >
          Post New Opportunity
        </button>
        <button 
          className={`tab-button ${activeTab === 'applicants' ? 'active' : ''}`}
          onClick={() => handleTabChange('applicants')}
        >
          View Applicants
        </button>
      </div>
      
      {activeTab === 'profile' && <ProfessorProfile />}
      {activeTab === 'opportunities' && <ProfessorOpportunities />}
      {activeTab === 'post' && <ProfessorPostOpportunity />}
      {activeTab === 'applicants' && <ProfessorApplicants />}
    </div>
  );
}

export default ProfessorDashboard;