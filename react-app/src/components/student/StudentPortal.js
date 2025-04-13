// components/student/StudentPortal.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentAuth from './StudentAuth';
import StudentProfile from './StudentProfile';
import StudentResume from './StudentResume';
import StudentInterests from './StudentInterests';
import { api } from '../../services/api';

function StudentPortal({ initialAuthTab }) {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('auth');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Handle successful login/registration
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentTab('profile');
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await api.logout();
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="portal-container student-portal">
      <div className="portal-header">
        <h2>Student Portal</h2>
        <p>Find assistantship opportunities that match your skills and interests</p>
      </div>
      
      {isLoggedIn ? (
        <>
          <div className="tab-navigation">
            <button 
              className={`tab-button ${currentTab === 'profile' ? 'active' : ''}`}
              onClick={() => setCurrentTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`tab-button ${currentTab === 'resume' ? 'active' : ''}`}
              onClick={() => setCurrentTab('resume')}
            >
              Resume
            </button>
            <button 
              className={`tab-button ${currentTab === 'interests' ? 'active' : ''}`}
              onClick={() => setCurrentTab('interests')}
            >
              Interests & Skills
            </button>
            <button 
              className={`tab-button ${currentTab === 'opportunities' ? 'active' : ''}`}
              onClick={() => setCurrentTab('opportunities')}
            >
              Opportunities
            </button>
            <button className="tab-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          
          {currentTab === 'profile' && <StudentProfile />}
          {currentTab === 'resume' && <StudentResume />}
          {currentTab === 'interests' && <StudentInterests />}
        </>
      ) : (
        <StudentAuth initialTab={initialAuthTab} onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default StudentPortal;

// // components/student/StudentPortal.js
// import React, { useState } from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import StudentAuth from './StudentAuth';
// import StudentDashboard from './StudentDashboard';

// function StudentPortal({ onLogin }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//     onLogin();
//     navigate('/student/dashboard');
//   };

//   return (
//     <div className="portal-container">
//       <div className="portal-header">
//         <h2>Student Portal</h2>
//         <p>Find research and teaching opportunities that match your skills and interests</p>
//       </div>
      
//       <Routes>
//         <Route 
//           path="/" 
//           element={
//             !isAuthenticated ? 
//             <StudentAuth onLoginSuccess={handleLoginSuccess} /> : 
//             <StudentDashboard />
//           } 
//         />
//         <Route 
//           path="/dashboard/*" 
//           element={
//             isAuthenticated ? 
//             <StudentDashboard /> : 
//             <StudentAuth onLoginSuccess={handleLoginSuccess} />
//           } 
//         />
//       </Routes>
//     </div>
//   );
// }

// export default StudentPortal;
