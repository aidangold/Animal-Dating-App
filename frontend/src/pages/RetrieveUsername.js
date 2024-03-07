import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';

function RetrieveUsernamePage() {
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

        fetch('https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/retrieve-username', {
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
            alert('Success: Username sent to your email!')
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        });
    };

    return (
        <div className="login-page">
            <h2>Retrieve Username Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Registered Email</label>
                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <button type="submit">Check my Username</button>
                <Link to="/login">Back</Link> 
            </form>
        </div>
    );
}

export default RetrieveUsernamePage;