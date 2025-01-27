import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../../redux/slices/filtersSlice';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Departments');
  const [groupedProducts, setGroupedProducts] = useState({});

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const groupByCategory = (products) => {
      return products.reduce((acc, curr) => {
        const category = curr.category || '';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(curr);
        return acc;
      }, {});
    };

    setGroupedProducts(groupByCategory(products));
  }, [products]);

  const getUniqueValues = (key) =>
    [...new Set(products.map((product) => product[key]))];

  let categorylist = ['All Departments', ...getUniqueValues('category')];

  let productListsByCategory = selectedCategory === 'All Departments'
    ? products
    : groupedProducts[selectedCategory] || [];

  console.log(productListsByCategory);

  return (
    <div className="search-box">
      <select
        className="category-dropdown"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categorylist.map((category, index) => (
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
      {/* <button className="search-button" onClick={handleSearch}>
        <span className="search-icon">🔍</span>
      </button> */}
    </div>
  );
};

export default Search;