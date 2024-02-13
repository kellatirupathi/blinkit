// src/App.js
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import SignUp from './SignUp';
import Login from './Login';
import ImageUpload from './ImageUpload';
import './App.css';
import Navbar from './Navbar';
import ImageList from './ImageList';

const App = () => {
  const [user, setUser] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleView = () => {
    setShowImageUpload((prev) => !prev);
  };

  const toggleForm = () => {
    setShowSignUp((prev) => !prev);
  };

  return (
    <div>
      {user ? (
        <div className="app-container">
          <Navbar user={user} />
          <div className="content-container">
            <button onClick={toggleView} style={{ width: '150px' }}>{showImageUpload ? 'Saved Images' : 'Upload Image'}</button>
            {showImageUpload ? <ImageUpload /> : <ImageList />}
          </div>
        </div>
      ) : (
        <div className="login-signup-container">
          <div className="login-signup-wrapper">
            {showSignUp ? <SignUp toggleForm={toggleForm} /> : <Login toggleForm={toggleForm} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

