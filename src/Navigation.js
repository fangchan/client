import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { CartContext } from './T_CarContext';
import { t } from 'i18next';

const Navigation = ({ onLogout, role,username, isLoggedIn }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [cartItems, setCartItems] = useState([]);

   
        const [openSubMenu, setOpenSubMenu] = useState(null);
      
        const toggleSubMenu = (index) => {
          setOpenSubMenu(openSubMenu === index ? null : index);
        };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            <div className="navigation-container">
                <img 
                    src={process.env.PUBLIC_URL + 'Images/icon-menu.svg'} 
                    alt="Menu" 
                    className="menu-icon" 
                    onClick={toggleMenu} 
                />
                <div className="logo-container">
                    <img 
                        src={process.env.PUBLIC_URL + 'Images/logo-buyinsy.png'} 
                        alt="Logo" 
                        className="logo" 
                    />
                </div>
                {menuOpen && (
                    <div className="dropdown-menu" ref={menuRef}>
                        {isLoggedIn && <h3>{t('Welcome')}, {username}!</h3>}
                        <Link to="#" onClick={toggleMenu}>全部商店</Link>
                        
                        <Link to="/Recipt" onClick={toggleMenu}>Recipt</Link>
                        <Link to="/statistic" onClick={toggleMenu}>銷量情報</Link>


          {/* Admin Menu */}                
        {role === 'admin' && (
                            <>                          
                <div>
                    <h4 onClick={() => toggleSubMenu(1)} style={{ cursor: 'pointer' }}>
                    {t('Admin Menu')}
                    </h4>
                    { (
                    <div style={{ paddingLeft: '20px' }}>
                        <h5 onClick={() => toggleSubMenu(2)} style={{ cursor: 'pointer' }}>
                        {t('User Management')}
                        </h5>
                        {openSubMenu === 2 && (
                        <ul>
                            <li><Link to="/Signup" onClick={toggleMenu}>{t('Create Shop User')}</Link>  
                            </li>
                            <li>{t('Edit Shop User')}</li>
                            <li>{t('Delete Shop User')}</li>
                        </ul>
                        )}
                        <h5 onClick={() => toggleSubMenu(3)} style={{ cursor: 'pointer' }}>
                        {t('Shop Management')}
                        </h5>
                        {openSubMenu === 3 && (
                        <ul>
                            <li>{t('View All Shops')}</li>
                            <li>{t('Edit Shop Information')}</li>
                            <li>{t('Delete Shop')}</li>
                        </ul>
                        )}
                        <h5 onClick={() => toggleSubMenu(4)} style={{ cursor: 'pointer' }}>
                        {t('Subscription Management')}
                        </h5>
                        {openSubMenu === 4 && (
                        <ul>
                            <li>{t('View All Subscriptions')}</li>
                            <li>{t('Verify Subscription')}</li>
                        </ul>
                        )}
                        <h5 onClick={() => toggleSubMenu(5)} style={{ cursor: 'pointer' }}>
                        {t('Promotions Management')}
                        </h5>
                        {openSubMenu === 5 && (
                        <ul>
                            <li>{t('View All Promotions')}</li>
                            <li>{t('Create Promotion')}</li>
                            <li>{t('Edit Promotion')}</li>
                            <li>{t('Delete Promotion')}</li>
                        </ul>
                        )}
                        <h5 onClick={() => toggleSubMenu(6)} style={{ cursor: 'pointer' }}>
                        {t('Coupons Management')}
                        </h5>
                        {openSubMenu === 6 && (
                        <ul>
                            <li>{t('View All Coupons')}</li>
                            <li>{t('Create Coupon')}</li>
                            <li>{t('Edit Coupon')}</li>
                            <li>{t('Delete Coupon')}</li>
                        </ul>
                        )}
                        <h5 onClick={() => toggleSubMenu(7)} style={{ cursor: 'pointer' }}>
                        {t('Reports & Analytics')}
                        </h5>
                        {openSubMenu === 7 && (
                        <ul>
                            <li>{t('Sales Reports')}</li>
                            <li>{t('User Activity Reports')}</li>
                        </ul>
                        )}
                        <h5 onClick={() => toggleSubMenu(8)} style={{ cursor: 'pointer' }}>
                        {t('System Settings')}
                        </h5>
                        {openSubMenu === 8 && (
                        <ul>
                            <li>{t('Set Permissions')}</li>
                            <li>{t('System Logs')}</li>
                        </ul>
                        )}
                
                    </div>
                    )}
                </div>
                            </>
                        )}

         {/* Shopuser Menu */}                
        {role === 'shopuser' && (
            <>
              
      <div>
        <h4 onClick={() => toggleSubMenu(9)} style={{ cursor: 'pointer' }}>
        {t('Shopuser Menu')}
        </h4>
        {openSubMenu === 9 && (
          <div style={{ paddingLeft: '20px' }}>
            <h5 onClick={() => toggleSubMenu(10)} style={{ cursor: 'pointer' }}>
            {t('Manage Shop')}
            </h5>
            {openSubMenu === 10 && (
              <ul>
                <li>{t('View My Shops')}</li>
                <li>{t('Edit Shop Information')}</li>
                <li>{t('Delete Shop')}</li>
              </ul>
            )}
            <h5 onClick={() => toggleSubMenu(11)} style={{ cursor: 'pointer' }}>
            {t('Manage Products')}
            </h5>
            {openSubMenu === 11 && (
              <ul>
                <li>{t('Create New Product')}</li>
                <li>{t('Edit Product')}</li>
                <li>{t('Delete Product')}</li>
                <li>{t('View Product List')}</li>
              </ul>
            )}
            <h5 onClick={() => toggleSubMenu(12)} style={{ cursor: 'pointer' }}>
            {t('Subscription')}
            </h5>
            {openSubMenu === 12 && (
              <ul>
                <li>{t('View My Subscription')}</li>
                <li>{t('Pay Monthly Fee')}</li>
              </ul>
            )}
            <h5 onClick={() => toggleSubMenu(13)} style={{ cursor: 'pointer' }}>
            {t('Promotions')}
            </h5>
            {openSubMenu === 13 && (
              <ul>
                <li>{t('View My Promotions')}</li>
                <li>{t('Create Promotion')}</li>
              </ul>
            )}
            <h5 onClick={() => toggleSubMenu(14)} style={{ cursor: 'pointer' }}>
            {t('Coupons')} (禮卷)
            </h5>
            {openSubMenu === 14 && (
              <ul>
                <li>{t('View My Coupons')}</li>
                <li>{t('Create Coupon')}</li>
              </ul>
            )}
           
          </div>
        )}
      </div>
            </>
        )}

        {/* Buyer Menu */}
        {role === 'buyer' && (
                            <>
                                  
      <div>
        <h4 onClick={() => toggleSubMenu(15)} style={{ cursor: 'pointer' }}>
        {t('Welcome')}Buyer Menu (買家菜單目錄)
        </h4>
        {openSubMenu === 15 && (
          <div style={{ paddingLeft: '20px' }}>
            <h5 onClick={() => toggleSubMenu(16)} style={{ cursor: 'pointer' }}>
            {t('Welcome')} Dashboard (儀表板)
            </h5>
            {openSubMenu === 16 && (
              <ul>
                <li>{t('Welcome')}Browse Shops (瀏覽店鋪)</li>
                <li>{t('Welcome')}View by Category (按類別查看)</li>
                <li>{t('Welcome')}Search Shops (搜索店鋪)</li>
              </ul>
            )}
            <h5 onClick={() => toggleSubMenu(17)} style={{ cursor: 'pointer' }}>
            {t('Welcome')}Shopping Cart (購物車)
            </h5>
            {openSubMenu === 17 && (
              <ul>
                <li>{t('Welcome')}View Cart (查看購物車)</li>
                <li>{t('Welcome')}Checkout (結帳)</li>
              </ul>
            )}
            <h5 onClick={() => toggleSubMenu(18)} style={{ cursor: 'pointer' }}>
              My Orders (我的訂單)
            </h5>
            {openSubMenu === 18 && (
              <ul>
                <li>{t('Welcome')}View Order History (查看過往訂單)</li>
                <li>{t('Welcome')}Order Details (訂單詳情)</li>
              </ul>
            )}
            <h5 onClick={() => toggleSubMenu(19)} style={{ cursor: 'pointer' }}>
              Profile (個人資料)
            </h5>
            {openSubMenu === 19 && (
              <ul>
                <li>{t('Welcome')}Edit Personal Information (編輯個人資訊)</li>
                <li>{t('Welcome')}Change Password (修改密碼)</li>
              </ul>
            )}
          
          </div>
        )}
      </div>
                                
                            </>
                        )}
                        {!isLoggedIn ? (
                            <>
                            
                            {/* Guest Menu */}
                            <div>
                                <h4 onClick={() => toggleSubMenu(20)} style={{ cursor: 'pointer' }}>
                                Guest Menu (未登入用戶菜單目錄)
                                </h4>
                                {openSubMenu === 20 && (
                                <div style={{ paddingLeft: '20px' }}>
                                    <h5 onClick={() => toggleSubMenu(21)} style={{ cursor: 'pointer' }}>
                                    Dashboard (儀表板)
                                    </h5>
                                    {openSubMenu === 21 && (
                                    <ul>
                                        <li>Browse Shops (瀏覽店鋪)</li>
                                        <li>View by Category (按類別查看)</li>
                                        <li>Search Shops (搜索店鋪)</li>
                                    </ul>
                                    )}
                                    <h5 onClick={() => toggleSubMenu(22)} style={{ cursor: 'pointer' }}>
                                    Register Account (註冊帳號)
                                    </h5>
                                    {openSubMenu === 22 && (
                                    <ul>
                                        <li>Sign Up as Buyer (註冊為買家)</li>
                                        <li>Contact Us (聯絡我們)</li>
                                        <li>FAQ (常見問題)</li>
                                        <li>Login (登入)</li>
                                    </ul>
                                    )}
                                </div>
                                )}
                            </div>
                            <Link to="/login" onClick={toggleMenu}>{t('Login')}</Link> // Show Login if not logged in
                            </>
                        ) : (
                             // Show Logout if logged in
                            <>
                             <Link to="/SendEmail" onClick={() => { onLogout(); toggleMenu(); }}>{t('SendEmail')}</Link>
                                <Link to="/OrderPage" onClick={toggleMenu}>{t('OrderPage')}</Link>
                                <Link to="/productslist" onClick={toggleMenu}>{t('Products List')}</Link>
                                <Link to="/coursetest" onClick={toggleMenu}>{t('Course Test')}</Link>
                            <Link to="/" onClick={() => { onLogout(); toggleMenu(); }}>{t('Logout')}</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </CartContext.Provider>
    );
};

export default Navigation;