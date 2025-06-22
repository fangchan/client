import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { CartContext } from './T_CarContext';
import { t } from 'i18next';

const Navigation = ({ onLogout, role,username, isLoggedIn }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
        // Access environment variables
    const env = process.env.REACT_APP_APP_ENV;
    const envClass = env ;
   

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
                        <Link to="/" onClick={toggleMenu}>Home</Link>
                        <Link to="#" onClick={toggleMenu}>全部商店</Link>
              
                        <Link class={envClass} to="/OrderPage" onClick={toggleMenu}>{t('Contact Us')}{env}</Link>
                        <Link to="/OrderPage" onClick={toggleMenu}>{t('FAQ')}(常見問題)</Link>
                        <Link to="/Recipt" onClick={toggleMenu}>{t('Recipt')}</Link>
                        


          {/* Admin Menu */}                
        {role === 'admin' && (
                            <>                          
                    <div style={{ paddingLeft: '10px' }}>
                        <h5 onClick={() => toggleSubMenu(2)} style={{ cursor: 'pointer' }}>
                        {t('User Management')}
                        </h5>
                        {openSubMenu === 2 && (
                        <ul style={{ paddingLeft: '20px' }}>
                            <li><Link to="/Signup" onClick={toggleMenu}>{t('Create Shop User')}</Link>  
                            </li>
                            <li><Link to="/" onClick={toggleMenu}>{t('Edit Shop User')}</Link>  
                            </li>
                            <li><Link to="/" onClick={toggleMenu}>{t('Delete Shop User')}</Link>  
                            </li>
                        </ul>
                        )}
                        <h5 onClick={() => toggleSubMenu(3)} style={{ cursor: 'pointer' }}>
                        {t('Shop Management')}
                        </h5>
                        {openSubMenu === 3 && (
                        <ul style={{ paddingLeft: '20px' }}>
                            <li><Link to="/" onClick={toggleMenu}>{t('View All Shops')}</Link></li>
                            <li><Link to="/" onClick={toggleMenu}>{t('Edit Shop Information')}</Link></li>
                            <li><Link to="/" onClick={toggleMenu}>{t('Delete Shop')}</Link></li>
                        </ul>
                        )}
                        <h5 class={envClass} onClick={() => toggleSubMenu(4)} style={{ cursor: 'pointer' }}>
                        {t('Subscription Management')}
                        </h5>
                        {openSubMenu === 4 && (
                        <ul style={{ paddingLeft: '20px' }}>
                            <li><Link to="/" onClick={toggleMenu}>{t('View All Subscriptions')}</Link></li>
                            <li><Link to="/" onClick={toggleMenu}>{t('Verify Subscription')}</Link></li>
                        </ul>
                        )}
                        <h5 class={envClass} onClick={() => toggleSubMenu(5)} style={{ cursor: 'pointer' }}>
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
                        <h5 class={envClass} onClick={() => toggleSubMenu(6)} style={{ cursor: 'pointer' }}>
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
                        <h5 class={envClass} onClick={() => toggleSubMenu(7)} style={{ cursor: 'pointer' }}>
                        {t('Reports')} & {t('Analytics')}
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
                        <ul style={{ paddingLeft: '20px' }}>
                            <li><Link to="/" onClick={toggleMenu}>{t('Set Permissions')}</Link></li>
                            <li><Link to="/" onClick={toggleMenu}>{t('System Logs')}</Link></li>
                        </ul>
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
        {(
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
              <h5><ul>
                <li> <Link to="/statistic" onClick={toggleMenu}>銷量情報</Link></li>
              </ul></h5>
           
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
                                        
                              
                                <div style={{ paddingLeft: '20px' }}>
                                    <ul>
                                        <li>Browse Shops (瀏覽店鋪)</li>
                                        <li>View by Category (按類別查看)</li>
                                        <li>Search Shops (搜索店鋪)</li>
                                    </ul>    
                                </div>
                          
                            <Link to="/login" onClick={toggleMenu}>{t('Browse Shops')}</Link>
                            <Link to="/login" onClick={toggleMenu}>{t('View by Category')}</Link>
                            <Link to="/login" onClick={toggleMenu}>{t('Search Shops')}</Link>

                            <Link to="/OrderPage" onClick={toggleMenu}>{t('Sign Up as Buyer')}</Link>
                            <Link to="/login" onClick={toggleMenu}>{t('Login')}</Link>
                            </>
                             // Show Login if not logged in
                        ) : (
                             // Show Logout if logged in
                            <>
                             <Link to="/SendEmail" onClick={toggleMenu}>{t('SendEmail')}</Link>
                              <Link to="/OrderPage" onClick={toggleMenu}>{t('OrderPage')}</Link>
                              <Link to="/productslist" onClick={toggleMenu}>{t('Products List')}</Link>
                              <Link to="/coursetest" onClick={toggleMenu}>{t('Course Test')}</Link>
                             <Link to="/passwordreset" onClick={toggleMenu}>{t('Password Reset')}</Link>
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