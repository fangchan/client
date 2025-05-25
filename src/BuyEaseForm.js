// src/BuyEaseForm.js
import React, { useState } from 'react';

import styles from './BuyEaseForm.module.css';


const BuyEaseForm = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div>
            <h2>商店資料</h2>
            <form>
                <div className="styles.form-group">                
                    <input type="text" placeholder="Enter ID" />
                </div>
                <div className="styles.form-group">
                    <input type="text" placeholder="Enter Name" />
                </div>
                <div className="styles.form-group">
                    <input type="email" placeholder="Enter Email" />
                </div>
                <div className="styles.form-group">
                    <input type="tel" placeholder="Enter Phone Number" />
                </div>
                <div className="styles.form-group">
                    <select>
                        <option value="">Select Category</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                    </select>
                </div>
                <div className="styles.form-group">
                    <input type="date" />
                </div>
                <div className="styles.form-group">
                    <input type="date" />
                </div>
                <div className="styles.form-group styles.upload-group">
                    <div className="styles.upload-container">
                        <label className="styles.upload-button">
                            <input type="file" />                    
                            
                            <img src={process.env.PUBLIC_URL+'images/icon-add-1.svg'} alt="Upload Icon" className="upload-icon" />
                        </label>
                    </div>
                </div>
                <button type="submit">建立商店</button>
            </form>
        </div>
    );
};

export default BuyEaseForm;