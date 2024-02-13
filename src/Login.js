// src/Login.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { Button, Input, notification } from 'antd';
import './App.css';

const Login = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const handleLogin = async () => {
    try {
      if (isForgotPassword) {
        // Handle password reset
        await auth.sendPasswordResetEmail(email);
        openNotification('success', 'Password Reset Email Sent', 'Check your email for further instructions');
        setIsForgotPassword(false);
      } else {
        // Handle login
        await auth.signInWithEmailAndPassword(email, password);
        openNotification('success', 'Login Successful', 'You are now logged in!');
        setTimeout(() => {
          notification.destroy();
        }, 1000);
      }
    } catch (error) {
      console.error(error.message);
      openNotification('error', isForgotPassword ? 'Password Reset Failed' : 'Login Failed', error.message);
    }
  };

  return (
    <div>
      <h2>{isForgotPassword ? 'Forgot Password' : 'Login'}</h2>
      {isForgotPassword ? (
        <>
          <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px'}}/>
          <Button type="primary" onClick={handleLogin} style={{ width: '50%' }}>
            Send Reset Email
          </Button>
        </>
      ) : (
        <>
          <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px'}}/>
          <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px'}}/>
          <Button type="primary" onClick={handleLogin} style={{ width: '50%' }}>
            Login
          </Button>
        </>
      )}
      <p>
        {isForgotPassword ? (
          <span onClick={() => setIsForgotPassword(false)} style={{ color: 'blue', cursor: 'pointer' }}>Cancel</span>
        ) : (
          <span onClick={() => setIsForgotPassword(true)} style={{ color: 'blue', cursor: 'pointer' }}>Forgot Password?</span>
        )}
        {' | '}
        <span onClick={toggleForm} style={{ color: 'blue', cursor: 'pointer' }}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
