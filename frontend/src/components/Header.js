import logo from '../images/logo.png';
import {Outlet, Link, useNavigate } from "react-router-dom";
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
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user_name');
        
        if (user) {
            setIsLoggedIn(true);
            setUsername(user);

            if (sessionStorage.getItem('userRole') == 'admin') {
                setIsAdmin(true);
            }
        }

        const handleLoginSuccess = (event) => {
            setIsLoggedIn(true);
            setUsername(event.detail.user_name);
            setIsAdmin(event.detail.user_role === 'admin');
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
            sessionStorage.removeItem('userRole');
            setIsLoggedIn(false);
            setUsername('');
            setIsAdmin(false);
            console.log('User logged out');
        }

        if (event.target.value === 'view-all') {
            navigate('/view-pets');
        }

        if (event.target.value === 'add-pet') {
            navigate('/add-pet');
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
                    <Link to="/match">Match with Pets</Link>
                    {username ? (
                        <select className="select-style" onChange={handleSelectChange} value="">
                            <option value="" disabled>{username}</option>
                            {isAdmin && (
                                <>
                                <option value="view-all">View All Pets</option>
                                <option value="add-pet">Add a Pet</option>
                                </>
                            )}
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