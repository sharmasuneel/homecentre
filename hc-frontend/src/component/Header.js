import React, { useState } from 'react';
import './Header.css'; 

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Departments');

  const categories = ['All Departments', 'Electronics', 'Clothing', 'Books', 'Sports'];

  const handleSearch = () => {
    console.log('Search for:', searchQuery);
    //  search logic 
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <h1>HomeCenter</h1> {/* img-logo */}
        </div>
        <div className="search-box">
          <select 
            className="category-dropdown" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option 
                key={index} 
                value={category} 
                className={category === 'All Departments' ? 'black-text' : ''}
              >
                {category}
              </option>
            ))}
          </select>
          <input 
            type="text" 
            className="search-input" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search for products..."
          />
          <button className="search-button" onClick={handleSearch}>
            <span className="search-icon">🔍</span> 
          </button>
        </div>
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
