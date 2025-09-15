import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <div className="logo-area">
          <h1 className="logo-text">Wyer</h1>
        </div>
        <div className="navbar-icons">
          <Link to="/" className="nav-item-content">
            
            <span className="text">Users</span>
          </Link>
          <button onClick={handleLogout} className="logout-button">
            
            <span className="text">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;