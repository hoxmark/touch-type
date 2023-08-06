// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';

function Header() {
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleTitleClick = () => {
        navigate('/select-exercise'); // Navigate back to exercise selector
    };

    return (
        <header className="app-header">
            <h1 id="headerLogo" className="header-title" onClick={handleTitleClick}>Touch Typing</h1>
            <div className="login-container">
                {/* Replace with your actual login component */}
                <button id="loginButton" className="login-button">Login</button>
            </div>
        </header>
    );
}

export default Header;