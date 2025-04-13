// components/common/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, userType, onLogout }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        AcademicAssist
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/student">Student Portal</Link>
            <Link to="/professor">Professor Portal</Link>
          </>
        ) : (
          <>
            <Link to={`/${userType}`}>
              {userType === 'student' ? 'Student Dashboard' : 'Professor Dashboard'}
            </Link>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;