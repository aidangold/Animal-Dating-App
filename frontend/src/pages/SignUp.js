import React, { useState } from 'react';
import './SignUp.css';

function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        contactAddress: ''
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
        
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
    
        // Prepare the data to be sent to the backend
        const userData = {
            userName: formData.username,
            password: formData.password,
            userEmail: formData.email,
            userFirstName: formData.firstName,
            userLastName: formData.lastName,
            userPhoneNo: formData.phoneNumber,
            contactAddress: formData.contactAddress,
            userRole: "user"
        };
    
        // POST request to the backend
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Redirect to login page
            console.log('Redirecting to login page...');
            window.location.href = 'http://localhost:3000/login';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    

    return (
        <div className="signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contactAddress">Contact Address</label>
                    <input type="text" id="contactAddress" name="contactAddress" value={formData.contactAddress} onChange={handleChange} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;
