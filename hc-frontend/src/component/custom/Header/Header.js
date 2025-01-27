import React from 'react';
import './Header.css'; 
import Search from '../Search/Search';

const Header = () => {
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
          <button className="account-btn">Sign In</button>
          <button className="signup-btn">Sign Up</button> 
        </div>
        <button className="cart-btn">
          Cart
          <span className="cart-item-count">0</span> {/* Show number of items in cart */}
        </button>
      </div>
    </header>
  );
};

export default Header;