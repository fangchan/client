import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Signup.module.css';

const SignupAndSendEmail = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setGeneratedPassword(generatePassword()); // Generate password on mount
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/forget', { username, email, generatedPassword });
            alert(t('User created!'));

            await axios.post('http://localhost:5000/send-email', {
                email,
                content: `Your Password is ${generatedPassword}`,
                header: 'Welcome!',
            });
            alert(t('Email sent successfully!'));
            navigate('/');
        } catch (error) {
            alert(t('Signup failed: ') + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    const generatePassword = () => {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length: 8 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    };

    return (
        <div>
            {loading && <div className={styles.loadingOverlay}>Loading...</div>}
            <h1>{t('Forget Password')}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={t('Username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="hidden"
                    value={generatedPassword}
                    readOnly
                />
                <input
                    type="email"
                    placeholder={t('Email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">{t('Send Email')}</button>
                <br /> <br />
                <div> 
                <a href="/login">Login</a> {/* Link for forgot password */}
                </div>
            </form>
            
        </div>
    );
};

export default SignupAndSendEmail;