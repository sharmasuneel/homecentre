import React, { useEffect, useState, useRef } from 'react';
import './Carousel.css';
import { fetchProducts } from 'utils/services';

const Carousel = () => {
  const [list, setList] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Define the async function inside the useEffect hook
    const fetchData = async () => {
      try {
        const data = await fetchProducts(); // Assuming fetchProducts is defined elsewhere
        setList(data.products)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData(); // Call the async function inside useEffect
  }, []); 

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleTileClick = (id) => {
    alert(`Product ${id} clicked!`);
  };

  return (
    <div className="carousel-wrapper" id='carousel'>
      <button className="scroll-button left" onClick={scrollLeft}>‹</button>

      <div className="carousel-container" ref={carouselRef}>
        <div className="carousel-items">
          {list.map((item) => (
            <div
              key={item.id}
              className="carousel-item"
              onClick={() => handleTileClick(item.id)}
              role="button"
              tabIndex={0}
              aria-label={`Click to view ${item.title}`}
              onKeyDown={()=>{}}
            >
              <img src={item.images} alt={item.title} />
              <div className="carousel-title">{item.title}</div>
              <div className="carousel-rating">Rating: {item.rating}</div>
              <div className="carousel-price">${item.price}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="scroll-button right" onClick={scrollRight}>›</button>
    </div>
  );
};

export default Carousel;
