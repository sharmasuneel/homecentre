const { getFilterProducts, searchProducts, searchProductsV1 } = require('./productUtility');
describe('Product Filtering Functions', () => {
  const products = [{
    "category": "beauty",
    "price": 9.99,
    "rating": 4.94,
    "brand": "Galmour",
    "reviews": [
      {
        "rating": 2,
      },
      {
        "rating": 2,
      },
      {
        "rating": 5,
      }
    ]
  }, {
    "category": "beauty",
    "price": 9.99,
    "rating": 4.94,
    "brand": "Essence",
    "reviews": [
      {
        "rating": 2,
      },
      {
        "rating": 2,
      },
      {
        "rating": 5,
      }
    ]
  }];

  test('getFilterProducts should filter products based on key and value', () => {
    const result = getFilterProducts('brand', 'Essence', products);
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe('Essence');
  });

  test('searchProducts should filter products based on query object', () => {
    const query = { brand: 'Essence', category: 'beauty' };
    const result = searchProducts(query, products);
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe('Essence');
    expect(result[0].category).toBe('beauty');
  });

  test('searchProductsV1 should filter products based on payload object', () => {
    const payload = {
      category: 'beauty',
      brand: ['Essence', 'Galmour'],
      price: { min: 2, max: 30 },
      reviewRating: 1
    };
    const result = searchProductsV1(payload, products);
    expect(result).toHaveLength(2);
    expect(result[0].brand).toBe('Galmour');
    expect(result[0].category).toBe('beauty');
    expect(result[0].price).toBeLessThanOrEqual(30);
    expect(result[0].price).toBeGreaterThanOrEqual(2);
    expect(result[0].reviews.some(review => review.rating >= 1)).toBe(true);
  });
});
