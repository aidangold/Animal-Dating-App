import logo from '../images/logo.png';
import {Outlet, Link} from "react-router-dom";
import './header.css';
import React, { useState, useEffect } from 'react';

function Logo() {
    return (
        <img src={logo} 
            width={74}
            height={74}
            className="App-logo"
            alt="" />
    )
}

// Header component tutorial: https://www.youtube.com/watch?v=0hKFJr1TA6c
export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const user = sessionStorage.getItem('user_name');
        if (user) {
            setIsLoggedIn(true);
            setUsername(user);
        }

        const handleLoginSuccess = (event) => {
            setIsLoggedIn(true);
            setUsername(event.detail.user_name);
        };

        window.addEventListener('loginSuccess', handleLoginSuccess);

        return () => {
            window.removeEventListener('loginSuccess', handleLoginSuccess);
        };
    }, []);

    const handleSelectChange = (event) => {
        if (event.target.value === 'logout') {
            sessionStorage.removeItem('user_id');
            sessionStorage.removeItem('user_name');
            setIsLoggedIn(false);
            console.log('User logged out');
            setUsername('');
        }
    };

    return (
    <>
        <nav>
            <div className='app-header'>
                <div className='header-logo'>
                    <Logo />
                    <Link to="/">OSU Adoption Center</Link>
                </div>
                <div className="header-nav">
                    <a href="/match">Match with Pets</a>
                    {username ? (
                        <select className="select-style" onChange={handleSelectChange} value="">
                            <option value="" disabled>{username}</option>
                            <option value="logout">Log Out</option>
                        </select>
                    ) : (
                        <>
                            <Link to="/signup" className="button">Sign Up!</Link>
                            <Link to="/login" className="button">Log In</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>

        <Outlet />
    </>
    )
}