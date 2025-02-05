import React from 'react';
import './Header.css';
import Search from '../Search/Search';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleRedirect = (e) => {
    e.target.name === 'login' ? navigate('/login') : e.target.name === 'signup' ? navigate('/signup') : navigate('/cart');
  }
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <header className='header'>
      <div className='header-left'>
        <div className="logo">
          <h1>HomeCenter</h1> 
        </div>
        <Search />
      </div>
      <div className="header-right">
        <div className="account-options">
          {!isAuthenticated && <button className="account-btn" name='login' onClick={handleRedirect}>Sign In</button>}
          {!isAuthenticated && <button className="signup-btn" name='signup' onClick={handleRedirect}>Sign Up</button>}
        </div>
        <button className="cart-btn" name='cart' onClick={handleRedirect}>
          Cart
          <span className="cart-item-count">0</span> {/* Show number of items in cart */}
        </button>
        {isAuthenticated && <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Logout
        </button>}  
      </div>
    </header>
  );
};

export default Header;