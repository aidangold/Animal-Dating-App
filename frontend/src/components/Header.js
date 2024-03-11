import logo from '../images/logo.png';
import {Outlet, Link, useNavigate} from "react-router-dom";
import { useAuth } from './AuthProvider';
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
    const navigate = useNavigate();
    const auth = useAuth();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (auth.isLoggedIn) {
            setIsLoggedIn(true);
        }

        const handleLoginSuccess = (event) => {
            setIsLoggedIn(true);
        };

        window.addEventListener('loginSuccess', handleLoginSuccess);

        return () => {
            window.removeEventListener('loginSuccess', handleLoginSuccess);
        };
    }, []);

    const handleSelectChange = (event) => {
        if (event.target.value === 'logout') {
            auth.logOut();
            setIsLoggedIn(false);
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
                    <Link to="/match" className="link">Match with Pets</Link>
                    {isLoggedIn ? (
                        <select className="select-style" onChange={handleSelectChange} value="">
                            <option value="" disabled>{auth.username}</option>
                            {auth.isAdmin && (
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