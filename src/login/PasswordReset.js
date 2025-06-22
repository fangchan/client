import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = ({ isLoggedIn, onLoginSuccess }) => {
    const [newpassword, setNewpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const navigate = useNavigate();

    // Redirect if the user is already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/passwordreset', { newpassword, confirmpassword });
            console.log('Response:', response);
            // Ensure response.data exists
            if (response && response.data) {
                const { token, user } = response.data; // Get token and user object
                const { username, role } = user; // Extract username and role from user object
                onLoginSuccess(token, { username, role }); // Pass token and user info
                navigate('/'); // Redirect after successful login
            } else {
                alert('Unexpected response format');
            }
        } catch (error) {
            // Handle errors and ensure accessing error.response
            if (error.response) {
                alert('Login failed: ' + error.response.data);
            } else {
                alert('Login failed: ' + error.message);
            }
        }
    };

    return (
        <form id="login_form" onSubmit={handleSubmit}>
            <h1>Password Reset</h1>
            <input
                type="password"
                placeholder="New Password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <button type="submit">Confirm</button>

        </form>
    );
};

export default Login;