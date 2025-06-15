import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SendEmail = () => {
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        generatePassword(); // Automatically generate password on component mount
    }, []);

    const handleSendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/send-email', {
                email,
                content,
                header: 'testing header',
            });
            alert(response.data); // Show success message
            navigate('/'); // Redirect to the root path
        } catch (error) {
            alert('Error sending email: ' + error.message);
        }
    };

    const generatePassword = () => {
        const length = 8;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        setGeneratedPassword(password); // Update the generated password state     
        setContent(`Your Password is ${password}`); // Set initial content with password
    };  

    return (
        <div>
            <h1>Send Test Email</h1>
            <input
                type="email"
                placeholder="Enter target email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
                placeholder="Enter email content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input
                type="text"
                placeholder="Generated Password"
                value={generatedPassword}
                readOnly // Make this input read-only
            />
            <button onClick={handleSendEmail}>Send Email</button>
        </div>
    );
};

export default SendEmail;