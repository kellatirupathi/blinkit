// src/SignUp.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { Button, Input, notification } from 'antd';
import './App.css';

const SignUp = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // Email is already registered
        notification.error({
          message: 'Email Already Exists',
          description: 'The provided email is already registered. Please use a different email address.',
        });
      } else {
        // Other errors
        console.error(error.message);
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px'}}/>
      <Input.Password type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px'}}/>
      <Button type="primary" onClick={handleSignUp} style={{ width: '50%' }}>Sign Up</Button>
      <p>Already have an account? <span onClick={toggleForm} style={{color: 'blue', cursor: 'pointer'}}>Login</span></p>
    </div>
  );
};

export default SignUp;
