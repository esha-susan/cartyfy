import React from 'react';// Import React library so we can write JSX
import ReactDOM from 'react-dom/client';// Import ReactDOM to connect React with the real browser DOM
import './index.css';// Import global CSS file
import App from './App';// Import the main App component 

// Find the <div id="root"></div> in public/index.html
// This is the empty container where React will "paint" our app

const root=ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render (draw) the App component into the root div
// StrictMode helps catch errors and warnings during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
