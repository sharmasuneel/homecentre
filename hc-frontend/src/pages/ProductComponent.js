import React from 'react';
import './ProductComponent.css';

const ProductComponent = ({ product }) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    availabilityStatus,
    reviews,
    images,
    thumbnail,
  } = product;

  return (
    <div className="product-container flex flex-1 flex-col lg:flex-row p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="product-gallery flex-1 space-y-4">
        <img
          src={thumbnail}
          alt={title}
          className="product-thumbnail w-full h-auto rounded-lg shadow-md"
        />
        <div className="product-images flex space-x-4 overflow-x-auto">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} - ${index + 1}`}
              className="product-image w-20 h-20 object-cover rounded-md shadow-sm cursor-pointer"
            />
          ))}
        </div>
      </div>

      <div className="product-details flex-1 space-y-4">
        <h1 className="product-title text-3xl font-semibold text-gray-900">
          {title}
        </h1>
        <div className="product-rating flex items-center space-x-2 text-gray-700">
          <span>{rating} ⭐</span>
          <span>({reviews.length} reviews)</span>
        </div>
        <p className="product-description text-gray-600">{description}</p>

        <div className="product-price flex items-center space-x-4">
          <span className="price text-xl font-bold text-gray-900">
            ₹{price}
          </span>
          {discountPercentage > 0 && (
            <span className="discount text-sm text-red-600">
              <em>{discountPercentage}% OFF</em>
            </span>
          )}
        </div>

        <div className="product-availability text-gray-700">
          <span>{availabilityStatus}</span>
        </div>

        <div className="product-stock text-gray-600">
          <span>Stock: {stock} available</span>
        </div>

        <div className="product-actions flex space-x-4">
          <button className="add-to-cart bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add to Cart
          </button>
          <button className="buy-now bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
