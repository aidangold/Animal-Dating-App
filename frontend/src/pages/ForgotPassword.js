import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
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

        const DataToSend = {
            userEmail: formData.email,
        };

        fetch('http://localhost:5000/forgot-password', {
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
            alert('Success: Password reset link sent to your email!')
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        });
    };

    return (
        <div className="login-page">
            <h2>Reset Password Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Registered Email</label>
                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <button type="submit">Reset Password</button>
                <Link to="/login">Back</Link> 
            </form>
        </div>
    );
}

export default ForgotPasswordPage;