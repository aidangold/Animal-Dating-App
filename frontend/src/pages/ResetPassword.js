import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LogIn.css';

function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newpassword: '',
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
        console.log(formData);

        // check if passwords match
        if (formData.newpassword !== formData.confirmPassword) {
            alert('Error: Passwords do not match.');
            return;
        }

        const DataToSend = {
            newpassword: formData.newpassword,
        };

        fetch(`https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/reset-password/${token}`, {
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
            alert(`Success: Password for ${data["Your email"]} reset successfully!`)
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
                    <label htmlFor="newpassword">New Password</label>
                    <input type="password" id="newpassword" name="newpassword" value={formData.newpassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPasswordPage;