import React, { useState } from 'react';

function ProfessorAuth({ initialTab, onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerDepartment, setRegisterDepartment] = useState('');
  
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
    console.log('Register with:', registerName, registerEmail, registerPassword, registerDepartment);
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
            <label htmlFor="professor-email">Email Address</label>
            <input 
              type="email" 
              id="professor-email" 
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="professor-password">Password</label>
            <input 
              type="password" 
              id="professor-password" 
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
            <label htmlFor="new-professor-name">Full Name</label>
            <input 
              type="text" 
              id="new-professor-name"
              // components/professor/ProfessorAuth.js (continued)
              placeholder="Enter your full name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-professor-email">Email Address</label>
            <input 
              type="email" 
              id="new-professor-email" 
              placeholder="Enter your email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-professor-password">Password</label>
            <input 
              type="password" 
              id="new-professor-password" 
              placeholder="Create a password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-professor-department">Department</label>
            <input 
              type="text" 
              id="new-professor-department" 
              placeholder="e.g. Computer Science"
              value={registerDepartment}
              onChange={(e) => setRegisterDepartment(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
      )}
    </div>
  );
}

export default ProfessorAuth;







