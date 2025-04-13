import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MainPage from './components/MainPage';
import StudentPortal from './components/student/StudentPortal';
import ProfessorPortal from './components/professor/ProfessorPortal';
import DataViewer from './components/DataViewer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { api } from './services/api';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.checkAuth();
        if (response.authenticated) {
          setIsLoggedIn(true);
          setUserType(response.user.role);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setIsLoggedIn(false);
      setUserType(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route 
            path="/login" 
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!isLoggedIn ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <DataViewer /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student/*" 
            element={isLoggedIn && userType === 'student' ? 
              <StudentPortal /> : 
              <Navigate to="/login" />} 
          />
          <Route 
            path="/professor/*" 
            element={isLoggedIn && userType === 'professor' ? 
              <ProfessorPortal /> : 
              <Navigate to="/login" />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;