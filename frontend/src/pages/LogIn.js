import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';

function LogInPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const loginUser = (DataToSend) => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(DataToSend),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Save user_id and user_name to sessionStorage
            sessionStorage.setItem('user_id', data.user_id);
            sessionStorage.setItem('user_name', data.userName);
            const loginEvent = new CustomEvent('loginSuccess', { detail: { user_name: data.userName } });
            window.dispatchEvent(loginEvent);
            alert('Success: You are successfully logged in!');
            navigate('/match');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        loginUser({
            userName: formData.username,
            password: formData.password
        });
    };

    return (
        <div className="login-page">
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Log In</button>
            </form>
            <div className="forgot-options">
                <Link to="/forgot-password">Forgot Password</Link>
                <Link to="/retrieve-username">Forgot Username</Link> 
                <Link to="/signup">Sign Up</Link> 
            </div>
        </div>
    );
}

export default LogInPage;

