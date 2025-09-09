import React from 'react';// Import React (needed to define React components)
import {ShoppingCart } from 'lucide-react';// Import a shopping cart icon from the lucide-react library
import './Header.css'

// Define the props (inputs) that this Header component expects
// activeTab → tells which tab is currently active ('optimizer' or 'history')
// onTabChange → function that changes the active tab when a button is clicked
interface HeaderProps{
    activeTab:'optimizer'|'history';
    onTabChange:(tab:'optimizer'|'history')=>void;
}
// It uses the props defined above to show the active tab and handle tab switching
const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
return(
<header className='header'>
<div className='header-container'>
    <div className='header-content'>
        <div className='header-logo'>
            <ShoppingCart className="logo-icon"/>
            <h1 className='logo-text'>Smart Purchase Optimizer </h1>
        </div>
        <nav className='header-nav'>
        <button onClick={()=>onTabChange('optimizer')}
        className={`nav-button ${
            activeTab==='optimizer'?'nav-button-active':'nav-button-inactive'
        }`}>Optimizer</button>
          <button
              onClick={() => onTabChange('history')}
              className={`nav-button ${
                activeTab === 'history' ? 'nav-button-active' : 'nav-button-inactive'
              }`}
            >
              Purchase History
            </button>
            </nav>
</div>
</div>
</header>

);
};

export default Header;
