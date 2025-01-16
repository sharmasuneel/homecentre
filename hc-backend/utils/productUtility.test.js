const { getFilterProducts, searchProducts } = require('./productUtility'); 

describe('getFilterProducts', () => {
  const products = [
    { id: 1, category: 'electronics', name: 'Laptop' },
    { id: 2, category: 'electronics', name: 'Smartphone' },
    { id: 3, category: 'furniture', name: 'Chair' },
    { id: 4, category: 'furniture', name: 'Table' },
  ];

  it('should filter products by category', () => {
    const key = 'category';
    const value = 'electronics';
    const expected = [
      { id: 1, category: 'electronics', name: 'Laptop' },
      { id: 2, category: 'electronics', name: 'Smartphone' },
    ];

    const result = getFilterProducts(key, value, products);
    expect(result).toEqual(expected);
  });

  it('should return an empty array if no products match the filter', () => {
    const key = 'category';
    const value = 'toys';
    const expected = [];

    const result = getFilterProducts(key, value, products);
    expect(result).toEqual(expected);
  });

  it('should filter products by name', () => {
    const key = 'name';
    const value = 'Chair';
    const expected = [
      { id: 3, category: 'furniture', name: 'Chair' },
    ];

    const result = getFilterProducts(key, value, products);
    expect(result).toEqual(expected);
  });
});

describe('searchProducts', () => {
  const products = [
    { id: 1, category: 'electronics', name: 'Laptop', brand: 'HP' },
    { id: 2, category: 'electronics', name: 'Smartphone', brand: 'Samsung' },
    { id: 3, category: 'furniture', name: 'Chair', brand: 'IKEA' },
    { id: 4, category: 'furniture', name: 'Table', brand: 'IKEA' },
  ];
  
  it('should filter products by category and brand', () => {
    const query =  { category: 'electronics', brand: 'HP'}
    const expected = [
      { id: 1, category: 'electronics', name: 'Laptop', brand: 'HP' }
    ];

    const result = searchProducts(query, products);
    expect(result).toEqual(expected);
  });
  
  it('should filter products by category, brand and name', () => {
    const query =  { category: 'furniture', name: 'Chair', brand: 'IKEA' }
    const expected = [
      { id: 3, category: 'furniture', name: 'Chair', brand: 'IKEA' }
    ];
    
    const result = searchProducts(query, products);
    expect(result).toEqual(expected);
  });

});