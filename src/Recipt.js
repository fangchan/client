import React from 'react';
import Navigation from './Navigation';
import styles from './Recipt.module.css';

const Recipt = () => {
    const items = [
        { name: '草莓開心果', price: 30, quantity: 6, imageUrl: '/path/to/image1.jpg' },
        { name: '草莓開心果', price: 30, quantity: 6, imageUrl: '/path/to/image2.jpg' },
        { name: '草莓開心果', price: 30, quantity: 6, imageUrl: '/path/to/image3.jpg' },
    ];

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
           
            <div className={styles.receipt}>
                {items.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemDetails}>
                            <h2 className={styles.itemName}>{item.name}</h2>
                            <p className={styles.itemPrice}>${item.price}</p>
                            <p className={styles.itemQuantity}>{item.quantity} 個</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.total}>  
                <button className={styles.button}><p>{total.toLocaleString()} HKD</p>下單</button>
            </div>
        </div>
    );
};

export default Recipt;