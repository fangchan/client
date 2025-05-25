import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderPage.module.css'; // Import the CSS Module

const OrderPage = ({ isLoggedIn, role }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('may'); // Initial state for active tab
    const [quantities, setQuantities] = useState(Array(3).fill(0)); // Assuming 3 items

    const items = [
        { id: 1, name: '草莓開心果', description: '剉冰 55個', price: 30, image: 'path_to_image_1.jpg' },
        { id: 2, name: '香橙雪糕', description: '剉冰 50個', price: 35, image: 'path_to_image_2.jpg' },
        { id: 3, name: '覆盆子慕斯', description: '剉冰 45個', price: 40, image: 'path_to_image_3.jpg' },
    ];

    useEffect(() => {
        // 检查用户是否登录且角色为 admin
        if (!isLoggedIn || role !== 'admin') {
            navigate('/'); // 重定向到主页
        }
    }, [isLoggedIn, role, navigate]);

    const handleIncrease = (index) => {
        setQuantities((prev) => {
            const newQuantities = [...prev];
            newQuantities[index] += 1;
            return newQuantities;
        });
    };

    const handleDecrease = (index) => {
        setQuantities((prev) => {
            const newQuantities = [...prev];
            if (newQuantities[index] > 0) {
                newQuantities[index] -= 1;
            }
            return newQuantities;
        });
    };

    const total = quantities.reduce((sum, qty, index) => sum + qty * items[index].price, 0);

    return (
        <div>
            <div className={styles.tabs}>
                <button className={`${styles.tab} ${activeTab === 'may' ? styles.active : ''}`} onClick={() => setActiveTab('may')}>
                    5月訂單
                </button>
                <button className={`${styles.tab} ${activeTab === 'june' ? styles.active : ''}`} onClick={() => setActiveTab('june')}>
                    6月團購
                </button>
            </div>

            {/* Conditional Rendering Based on Active Tab */}
            {activeTab === 'may' && (
                <div className={styles.items}>
                    {items.map((item, index) => (
                        <div key={item.id} className={styles.itemCard}>
                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                            <h3 className={styles.itemName}>{item.name}</h3>
                            <p className={styles.itemDescription}>{item.description}</p>
                            <p className={styles.itemPrice}>${item.price}</p>
                            <div className={styles.quantityControls}>
                                <button onClick={() => handleDecrease(index)} className={styles.quantityButton}>-</button>
                                <span className={styles.quantityDisplay}>{quantities[index]}</span>
                                <button onClick={() => handleIncrease(index)} className={styles.quantityButton}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'june' && (
                <div className={styles.items}>
                    {items.map((item, index) => (
                        <div key={item.id} className={styles.itemCard}>
                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                            <h3 className={styles.itemName}>{item.name}</h3>
                            <p className={styles.itemDescription}>{item.description}</p>
                            <p className={styles.itemPrice}>${item.price}</p>
                            <div className={styles.quantityControls}>
                                <button onClick={() => handleDecrease(index)} className={styles.quantityButton}>-</button>
                                <span className={styles.quantityDisplay}>{quantities[index]}</span>
                                <button onClick={() => handleIncrease(index)} className={styles.quantityButton}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.total}>
                <h3>合計: ${total}</h3>
                <button className={styles.checkoutButton}>下單</button>
            </div>
        </div>
    );
};

export default OrderPage;