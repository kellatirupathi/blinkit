// src/Navbar.js
import React from 'react';
import { auth } from './firebase';

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ position: 'fixed', top: '0', left: '0', right: '0', background: '#333', padding: '10px', color: '#fff', display: 'flex', justifyContent: 'space-between', zIndex: '1000' }}>
      <p>Welcome, {user.email}!</p>
      <button onClick={handleLogout} className='logout-btn' style={{ width: '6%'}}>Logout</button>
    </div>
  );
};

export default Navbar;
