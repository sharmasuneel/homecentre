import React from 'react';
import './Header.css';
import Search from '../Search/Search';
import { useNavigate } from 'react-router';
const Header = () => {
  const navigate = useNavigate();

  const handleRedirect = (e) => {
    e.target.name === 'login' ? navigate('/login') : e.target.name === 'signup' ? navigate('/signup') : navigate('/cart');
  }
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <h1>HomeCenter</h1> {/* img-logo */}
        </div>
        <Search />
      </div>

      <div className="header-right">
        <div className="account-options">
          <button className="account-btn" name='login' onClick={handleRedirect}>Sign In</button>
          <button className="signup-btn" name='signup' onClick={handleRedirect}>Sign Up</button>
        </div>
        <button className="cart-btn" name='cart' onClick={handleRedirect}>
          Cart
          <span className="cart-item-count">0</span> {/* Show number of items in cart */}
        </button>
      </div>
    </header>
  );
};

export default Header;