import React from 'react';
import './App.css';
import './mainpage/mainpage.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './mainpage/Home';
import Steps from './mainpage/Steps';
import About from './mainpage/About';

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <nav className="mp-nav">
          <Link to="/" className="mp-logo">I'm Mad 💔</Link>
          <div className="mp-navlinks">
            <Link to="/">Home</Link>
            <Link to="/steps">Win Me Back</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>

        <main className="mp-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/steps" element={<Steps />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="mp-footer">Made with sass and a sprinkle of drama ✨</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
