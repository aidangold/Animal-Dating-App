import React, { useState } from 'react';
import './LogIn.css';

function LogInPage() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try statement to avoid crashing
        try {
            const response = await fetch('http://localhost:5000/login', { // update later when deployed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: formData.username,
                    password: formData.password
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message); // happy login
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error('Error', error);
        }

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
                <button>Forgot Password</button>
                <button>Forgot Username</button> 
                <button>Sign Up</button> 
            </div>
        </div>
    );
}

export default LogInPage;

