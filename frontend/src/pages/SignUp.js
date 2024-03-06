import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userfirstname: '',
        userlastname: '',
        userphone: '',
        contactaddress: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        // future code for signup functionality logic and stuff here
        console.log(formData);

        // check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Error: Passwords do not match.');
            return;
        }

        const DataToSend = {
            userName: formData.username,
            password: formData.password,
            userEmail: formData.email,
            userFirstName: formData.userfirstname,
            userLastName: formData.userlastname,
            userPhoneNo: formData.userphone,
            contactAddress: formData.contactaddress,
            userRole: 'user' // default to 'user'
        };

        fetch('https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/signup', {
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
            alert('Thank For Registering!\nYour registration has been successful.')
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        });
    };

    return (
        <div className="signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userfirstname">First Name</label>
                    <input type="text" id="userfirstname" name="userfirstname" value={formData.userfirstname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="userlastname">Last Name</label>
                    <input type="text" id="userlastname" name="userlastname" value={formData.userlastname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="userphone">Phone Number</label>
                    <input type="text" id="userphone" name="userphone" value={formData.userphone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="contactaddress">Contact Address</label>
                    <input type="text" id="contactaddress" name="contactaddress" value={formData.contactaddress} onChange={handleChange} />
                </div>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;