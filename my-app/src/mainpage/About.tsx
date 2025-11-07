import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="mp-card">
      <h2 className="mp-title">About this tiny site</h2>
      <p className="mp-sub">This is a playful, gentle page to explain my feelings and give clear steps so my Cutu can show he cares and win me back.</p>
      <p className="mp-note">Use it wisely: honesty and respect are the best policies.</p>

      <div className="mp-actions">
        <Link to="/" className="mp-btn">Home</Link>
      </div>
    </div>
  );
};

export default About;
