import React from 'react';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="spline-container">
        <Spline scene="https://prod.spline.design/nbuMG2YSLDuegv5z/scene.splinecode" />
      </div>
      <div className="content-overlay">
        <h1>Leave Management System</h1>
        <p>Manage your leaves efficiently </p>
        <button onClick={() => navigate('/login')} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;