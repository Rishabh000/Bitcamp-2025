import React from 'react';

function Navbar({ navigateToMain }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={navigateToMain}>Academic Portal</div>
      <div className="nav-links">
        <a href="#" onClick={(e) => { e.preventDefault(); navigateToMain(); }}>Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); }}>About</a>
        <a href="#" onClick={(e) => { e.preventDefault(); }}>Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
