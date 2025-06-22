import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import styles from './Signup.module.css'; // Import the CSS module

const SignupAndSendEmail = () => {
    const { t } = useTranslation(); // Use the translation hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer'); // Default role
    const [email, setEmail] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const navigate = useNavigate();

    useEffect(() => {
        generatePassword(); // Automatically generate password on component mount
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            // First, sign up the user
            await axios.post('http://localhost:5000/signup', { username, password, role, email, generatedPassword });
            alert(t('User created!')); // Use translation for alerts

            // Then, send the email with the generated password
            const content = `Your Password is ${generatedPassword}`; // Set email content
            await axios.post('http://localhost:5000/send-email', {
                email,
                content,
                header: 'Welcome!',
            });
            alert(t('Email sent successfully!')); // Success message for email
            navigate('/'); // Redirect to the root path
        } catch (error) {
            alert(t('Signup failed: ') + (error.response?.data || error.message));
        } finally {
            setLoading(false); // Reset loading state
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
    };

    return (
        <div>
            {loading && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.loadingIcon}>Loading...</div>
                </div>
            )}
            <h1>{t('Signup and Send Email')}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={t('Username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder={t('Password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={t('Generated Password')}
                    value={generatedPassword}
                    readOnly // Make this input read-only
                />
                <input
                    type="email"
                    placeholder={t('Email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">{t('Admin')}</option>
                    <option value="shopuser">{t('Shop User')}</option>
                    <option value="buyer">{t('Buyer')}</option>
                </select>
                <br /> <br />
                <button type="submit">{t('Sign Up and Send Email')}</button>
            </form>
        </div>
    );
};

export default SignupAndSendEmail;