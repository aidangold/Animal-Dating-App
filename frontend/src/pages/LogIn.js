import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import './LogIn.css';

function LogInPage() {
    const auth = useAuth();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        auth.loginUser({
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

