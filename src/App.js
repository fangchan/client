import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';
import Signup from './login/Signup';
import Login from './login/Login';
import Forget from './login/Forget';
import Statistics from './Statistics';
import BuyEaseForm from './BuyEaseForm';
import Recipt from './Recipt';
import OrderPage from './OrderPage';
import ProductsList from './ProductsList';
import CourseTest from './coursetest';
import SendEmail from './SendEmail';
import PasswordReset from './login/PasswordReset';

import { useTranslation } from 'react-i18next';
import './i18n'; // Ensure this import is correct
import i18n from './i18n'; // Import the i18n instance for language changes

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUsername = localStorage.getItem('username') || '';
        const storedRole = localStorage.getItem('role') || '';
        setIsLoggedIn(loggedIn);
        setUsername(storedUsername);
        setRole(storedRole);
    }, []);

    const handleLoginSuccess = (token, user) => {
        setIsLoggedIn(true);
        setUsername(user.username);
        setRole(user.role);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.role);
        localStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setRole('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    };

    const { t } = useTranslation();

    // Language change functionality
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Router>
            <div>
                <h1>{t('welcome')}</h1>
                <p>{t('description')}</p>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('cn')}>简体</button>
                <button onClick={() => changeLanguage('zh')}>繁體</button>
            </div>
            <div className="container">
                <Navigation onLogout={handleLogout} role={role} username={username} isLoggedIn={isLoggedIn} />
                <Routes>
                     <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login isLoggedIn={isLoggedIn} onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/Forget" element={<Forget/>} />
                    <Route path="/statistic" element={<Statistics />} />
                    <Route path="/BuyEaseForm" element={<BuyEaseForm />} />
                    <Route path="/Recipt" element={<Recipt />} />
                    <Route path="/OrderPage" element={<OrderPage isLoggedIn={isLoggedIn} role={role} />} />
                    <Route path="/productslist" element={<ProductsList />} />
                    <Route path="/coursetest" element={<CourseTest />} />
                    <Route path="/SendEmail" element={<SendEmail />} />
                     <Route path="/passwordreset" element={<PasswordReset username={username}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;