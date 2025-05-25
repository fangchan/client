import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Signup = () => {
    const { t } = useTranslation(); // Use the translation hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer'); // Default role

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/signup', { username, password, role });
            alert(t('User created!')); // Use translation for alerts
        } catch (error) {
            alert(t('Signup failed: ') + error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={t('Username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder={t('Password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">{t('Admin')}</option>
                <option value="shopuser">{t('Shop User')}</option>
                <option value="buyer">{t('Buyer')}</option>
            </select>
            <button type="submit">{t('Sign Up')}</button>
        </form>
    );
};

export default Signup;