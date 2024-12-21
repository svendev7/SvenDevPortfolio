import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home/home.js';
import Intro from './pages/intro/intro.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Intro />
  </React.StrictMode>
);