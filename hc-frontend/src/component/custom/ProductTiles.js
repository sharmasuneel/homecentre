import React, { useEffect, useState } from 'react';
import './ProductTiles.css';

import { fetchProducts } from 'utils/services';

const CategoryTiles = () => {
  const [groupedProducts, setGroupedProducts] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        const groupedData = groupProductsByCategory(data.products); 
        setGroupedProducts(groupedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []); 

  const groupProductsByCategory = (products) => {
    const grouped = {};
    products.forEach(product => {
      const { category, images, id } = product;

      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push({
        id,
        images: images.slice(0, 1),
        title: product.title,
      });
    });

    return grouped;
  };

  const handleTileClick = (category) => {
    alert(`Category ${category} clicked!`);
  };

  return (
    <div className="category-tiles-container">
      {Object.keys(groupedProducts).map((category) => {
        const products = groupedProducts[category];

        return (
          <div key={category} className="category-tile" role='button' tabIndex={0} onClick={() => handleTileClick(category)} onKeyDown={()=>{} }>
            <h3 className="category-title">{category}</h3>
            <div className="category-images">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="product-image">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product ${product.title} ${index + 1}`}
                      className="category-image"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryTiles;
