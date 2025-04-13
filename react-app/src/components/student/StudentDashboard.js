import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentProfile from './StudentProfile';
import BrowseOpportunities from './BrowseOpportunities';
import MyApplications from './MyApplications';
import UploadResume from './UploadResume';
import { api } from '../services/api';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await api.login(email, password);
      // Handle successful login
    } catch (error) {
      // Handle error
    }
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
          Browse Opportunities
        </button>
        <button 
          className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => handleTabChange('applications')}
        >
          My Applications
        </button>
        <button 
          className={`tab-button ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => handleTabChange('resume')}
        >
          Upload Resume
        </button>
      </div>
      
      {activeTab === 'profile' && <StudentProfile />}
      {activeTab === 'opportunities' && <BrowseOpportunities />}
      {activeTab === 'applications' && <MyApplications />}
      {activeTab === 'resume' && <UploadResume />}
    </div>
  );
}

export default StudentDashboard;