import React, { useState } from 'react';

function StudentAuth({ initialTab, onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerProgram, setRegisterProgram] = useState('');
  
  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real application, this would validate with the backend
    console.log('Login with:', loginEmail, loginPassword);
    onAuthSuccess();
  };
  
  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    // In a real application, this would submit to the backend
    console.log('Register with:', registerName, registerEmail, registerPassword, registerProgram);
    onAuthSuccess();
  };

  return (
    <div className="tab-content auth-content">
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button 
          className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>
      
      {activeTab === 'login' ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="student-email">Email Address</label>
            <input 
              type="email" 
              id="student-email" 
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="student-password">Password</label>
            <input 
              type="password" 
              id="student-password" 
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="new-student-name">Full Name</label>
            <input 
              type="text" 
              id="new-student-name" 
              placeholder="Enter your full name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-student-email">Email Address</label>
            <input 
              type="email" 
              id="new-student-email" 
              placeholder="Enter your email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-student-password">Password</label>
            <input 
              type="password" 
              id="new-student-password" 
              placeholder="Create a password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-student-program">Program/Major</label>
            <input 
              type="text" 
              id="new-student-program" 
              placeholder="e.g. Computer Science"
              value={registerProgram}
              onChange={(e) => setRegisterProgram(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
      )}
    </div>
  );
}

export default StudentAuth;