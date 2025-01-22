import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllProducts,
  applyFilters,
  updateFilters,
} from '../../../redux/slices/filtersSlice';
import './FilterSideBar.css';


const FilterSideBar = () => {
  const dispatch = useDispatch();
  const { products, selectedFilters } = useSelector((state) => state.filters);
  const [dropdownStates, setDropdownStates] = useState({
    brand: false,
    categories: false,
    price: false,
    review: false,
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const toggleFilter = (category, item) => {
    const updatedCategory = Array.isArray(selectedFilters[category])
      ? selectedFilters[category].includes(item)
        ? selectedFilters[category].filter((i) => i !== item)
        : [...selectedFilters[category], item]
      : [item]; 

    dispatch(updateFilters({ [category]: updatedCategory }));
  };

  const handleApplyFilters = () => {
    dispatch(applyFilters(selectedFilters));
    console.log(selectedFilters,'filter button')
  };

  const getUniqueValues = (key) =>
    [...new Set(products.map((product) => product[key]))];

  const categories = getUniqueValues('category');
  const brands = getUniqueValues('brand');
  const priceRange = {
    min: Math.min(...products.map((product) => product.price)),
    max: Math.max(...products.map((product) => product.price)),
  };

  const renderDropdownList = (category, items) => (
    <ul className="dropdown-list">
      {items.map((item, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={Array.isArray(selectedFilters[category])
                ? selectedFilters[category]?.includes(item)
                : false}
              onChange={() => toggleFilter(category, item)}
            />
            {item}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="sidebar">
      <h2>Filters</h2>
  
      <div className="dropdown">
        <div
          className="dropdown-header"
          role="button"
          tabIndex="0"
          onClick={() => toggleDropdown('brand')}
          onKeyDown={(e) => e.key === 'Enter' && toggleDropdown('brand')}
        >
          Brand
        </div>
        {dropdownStates.brand && renderDropdownList('brand', brands)}
      </div>

      <div className="dropdown">
        <div
          className="dropdown-header"
          role="button"
          tabIndex="0"
          onClick={() => toggleDropdown('categories')}
          onKeyDown={(e) => e.key === 'Enter' && toggleDropdown('categories')}
        >
          Categories
        </div>
        {dropdownStates.categories &&
          renderDropdownList('categories', categories)}
      </div>

      <div className="dropdown">
        <div
          className="dropdown-header"
          role="button"
          tabIndex="0"
          onClick={() => toggleDropdown('price')}
          onKeyDown={(e) => e.key === 'Enter' && toggleDropdown('price')}
        >
          Price: ${priceRange.min} - ${priceRange.max}
        </div>
        {dropdownStates.price && (
          <ul className="dropdown-list">
            <li>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    toggleFilter('price', { min: 0, max: 10 })
                  }
                />
                $0 - $10
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    toggleFilter('price', { min: 10, max: 20 })
                  }
                />
                $10 - $20
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    toggleFilter('price', { min: 20, max: 30 })
                  }
                />
                $20 - $30
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="dropdown">
        <div
          className="dropdown-header"
          role="button"
          tabIndex="0"
          onClick={() => toggleDropdown('review')}
          onKeyDown={(e) => e.key === 'Enter' && toggleDropdown('review')}
        >
          Reviews
        </div>
        {dropdownStates.review && (
          <ul className="dropdown-list">
            {[5, 4, 3].map((stars) => (
              <li key={stars}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => toggleFilter('review', stars)}
                  />
                  {stars} Stars
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterSideBar;
