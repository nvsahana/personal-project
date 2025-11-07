import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mp-card">
      <h1 className="mp-title">I'm Sad 😤</h1>
      <p className="mp-sub">Yes! I'm mad at my boyfriend. Why are you feeling that I am not applying? I am! Most of the time from yesterday you are working too hard workwise, to not notice it, you always catch me when I am not applying!! This is my little site telling him how I feel and what he can do to win me back.</p>

      <div className="mp-actions">
        <button
          className="mp-btn primary"
          onClick={() => { console.log('Navigate to /steps'); navigate('/steps'); }}
        >
          How to win me back
        </button>
        <Link to="/about" className="mp-btn">About this</Link>
      </div>
    </div>
  );
};

export default Home;
