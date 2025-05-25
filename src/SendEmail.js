import React, { useState } from 'react';
import axios from 'axios';

const SendEmail = () => {
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');

    const handleSendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/send-email', {
                email,
                content,
                header: 'testing header', // Set the email header
            });
            alert(response.data); // Show success message
        } catch (error) {
            alert('Error sending email: ' + error.message);
        }
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
            <button onClick={handleSendEmail}>Send Email</button>
        </div>
    );
};

export default SendEmail;