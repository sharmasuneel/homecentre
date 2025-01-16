import React, { useState } from 'react';
import './FilterSideBar.css';

const FilterSideBar = () => {
  const [dropdownStates, setDropdownStates] = useState({
    brand: false,
    categories: false,
    price: false,
    review: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    categories: [],
    price: [],
    review: [],
  });

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const handleCheckboxChange = (category, item) => {
    setSelectedFilters((prev) => {
      const updatedCategory = prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item];
      return { ...prev, [category]: updatedCategory };
    });
  };

  const renderDropdownList = (category, items) => (
    <ul className='dropdown-list'>
      {items.map((item) => (
        <li key={item}>
          <label>
            <input
              type='checkbox'
              checked={selectedFilters[category].includes(item)}
              onChange={() => handleCheckboxChange(category, item)}
            />
            {item}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div className='sidebar'>
      <h2>Filters</h2>

      <div className='dropdown'>
        <div
          className='dropdown-header'
          role='button'
          tabIndex='0'
          onClick={() => toggleDropdown('brand')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              toggleDropdown('brand');
            }
          }}
        >
          Brand
        </div>
        {dropdownStates.brand &&
          renderDropdownList('brand', ['Nike', 'Adidas', 'Puma', 'Reebok'])}
      </div>

      <div className='dropdown'>
        <div
          className='dropdown-header'
          role='button'
          tabIndex='0'
          onClick={() => toggleDropdown('categories')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              toggleDropdown('categories');
            }
          }}
        >
          Categories
        </div>
        {dropdownStates.categories &&
          renderDropdownList('categories', [
            'Men',
            'Women',
            'Kids',
            'Accessories',
          ])}
      </div>

      <div className='dropdown'>
        <div
          className='dropdown-header'
          role='button'
          tabIndex='0'
          onClick={() => toggleDropdown('price')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              toggleDropdown('price');
            }
          }}
        >
          Price
        </div>
        {dropdownStates.price &&
          renderDropdownList('price', [
            'Under $50',
            '$50 - $100',
            '$100 - $200',
            'Above $200',
          ])}
      </div>

      <div className='dropdown'>
        <div
          className='dropdown-header'
          role='button'
          tabIndex='0'
          onClick={() => toggleDropdown('review')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              toggleDropdown('review');
            }
          }}
        >
          Review
        </div>
        {dropdownStates.review &&
          renderDropdownList('review', [
            '1 Star',
            '2 Stars',
            '3 Stars',
            '4+ Stars',
          ])}
      </div>
    </div>
  );
};

export default FilterSideBar;

// import React, { useState, useEffect } from 'react';
// import './FilterSideBar.css';

// const FilterSideBar = () => {
//   const [dropdownStates, setDropdownStates] = useState({
//     brand: false,
//     categories: false,
//     price: false,
//     review: false,
//   });

//   const [selectedFilters, setSelectedFilters] = useState({
//     brand: [],
//     categories: [],
//     price: { min: null, max: null },
//     review: [],
//   });

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:3020/products');
//         const data = await response.json();
//         setProducts(data.products);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleDropdown = (dropdown) => {
//     setDropdownStates((prevState) => ({
//       ...prevState,
//       [dropdown]: !prevState[dropdown],
//     }));
//   };

//   const handleCheckboxChange = (category, item) => {
//     setSelectedFilters((prev) => {
//       if (category === 'price') {
//         return { ...prev, price: { ...prev.price, ...item } };
//       }

//       const updatedCategory = prev[category].includes(item)
//         ? prev[category].filter((i) => i !== item)
//         : [...prev[category], item];
//       return { ...prev, [category]: updatedCategory };
//     });
//   };

//   const fetchDataApi = async () => {
//     const payload = {
//       category: selectedFilters.categories[0] || null,
//       price: selectedFilters.price,
//       brand: selectedFilters.brand,
//       review: selectedFilters.review,
//     };

//     try {
//       const response = await fetch('http://localhost:3020/products/query', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await response.json();
//       console.log('Response:', data);
//     } catch (error) {
//       console.error('Error submitting filters:', error);
//     }
//   };

//   const handleSubmit = async () => {
//     fetchDataApi();
//   };

//   const getUniqueValues = (key) => {
//     return [...new Set(products.map((product) => product[key]))];
//   };

//   const renderDropdownList = (category, items) => (
//     <ul className='dropdown-list'>
//       {items.map((item, index) => (
//         <li key={index}>
//           <label>
//             <input
//               type='checkbox'
//               checked={selectedFilters[category].includes(item)}
//               onChange={() => handleCheckboxChange(category, item)}
//             />
//             {item}
//           </label>
//         </li>
//       ))}
//     </ul>
//   );

//   const categories = getUniqueValues('category');
//   const brands = getUniqueValues('brand');

//   const priceRange = {
//     min: Math.min(...products.map((product) => product.price)),
//     max: Math.max(...products.map((product) => product.price)),
//   };

//   return (
//     <div className='sidebar'>
//       <h2>Filters</h2>

//       <div className='dropdown'>
//         <div
//           className='dropdown-header'
//           role='button'
//           tabIndex='0'
//           onClick={() => toggleDropdown('brand')}
//           onKeyDown={(event) => {
//             if (event.key === 'Enter' || event.key === ' ') {
//               toggleDropdown('brand');
//             }
//           }}
//         >
//           Brand
//         </div>
//         {dropdownStates.brand && renderDropdownList('brand', brands)}
//       </div>

//       <div className='dropdown'>
//         <div
//           className='dropdown-header'
//           role='button'
//           tabIndex='0'
//           onClick={() => toggleDropdown('categories')}
//           onKeyDown={(event) => {
//             if (event.key === 'Enter' || event.key === ' ') {
//               toggleDropdown('categories');
//             }
//           }}
//         >
//           Categories
//         </div>
//         {dropdownStates.categories &&
//           renderDropdownList('categories', categories)}
//       </div>

//       <div className='dropdown'>
//         <div
//           className='dropdown-header'
//           role='button'
//           tabIndex='0'
//           onClick={() => toggleDropdown('price')}
//           onKeyDown={(event) => {
//             if (event.key === 'Enter' || event.key === ' ') {
//               toggleDropdown('price');
//             }
//           }}
//         >
//           Price: ${priceRange.min} - ${priceRange.max}
//         </div>
//         {dropdownStates.price && (
//           <ul className='dropdown-list'>
//             <li>
//               <label>
//                 <input
//                   type='checkbox'
//                   onChange={() =>
//                     handleCheckboxChange('price', { min: 0, max: 10 })
//                   }
//                 />
//                 $0 - $10
//               </label>
//             </li>
//             <li>
//               <label>
//                 <input
//                   type='checkbox'
//                   onChange={() =>
//                     handleCheckboxChange('price', { min: 10, max: 20 })
//                   }
//                 />
//                 $10 - $20
//               </label>
//             </li>
//             <li>
//               <label>
//                 <input
//                   type='checkbox'
//                   onChange={() =>
//                     handleCheckboxChange('price', { min: 20, max: 30 })
//                   }
//                 />
//                 $20 - $30
//               </label>
//             </li>
//           </ul>
//         )}
//       </div>

//       <div className='dropdown'>
//         <div
//           className='dropdown-header'
//           role='button'
//           tabIndex='0'
//           onClick={() => toggleDropdown('review')}
//           onKeyDown={(event) => {
//             if (event.key === 'Enter' || event.key === ' ') {
//               toggleDropdown('review');
//             }
//           }}
//         >
//           Reviews
//         </div>
//         {dropdownStates.review && (
//           <ul className='dropdown-list'>
//             <li>
//               <label>
//                 <input
//                   type='checkbox'
//                   onChange={() => handleCheckboxChange('review', 5)}
//                 />
//                 5 Stars
//               </label>
//             </li>
//             <li>
//               <label>
//                 <input
//                   type='checkbox'
//                   onChange={() => handleCheckboxChange('review', 4)}
//                 />
//                 4 Stars
//               </label>
//             </li>
//             <li>
//               <label>
//                 <input
//                   type='checkbox'
//                   onChange={() => handleCheckboxChange('review', 3)}
//                 />
//                 3 Stars
//               </label>
//             </li>
//           </ul>
//         )}
//       </div>

//       <button onClick={handleSubmit}>Apply Filters</button>
//     </div>
//   );
// };

// export default FilterSideBar;
