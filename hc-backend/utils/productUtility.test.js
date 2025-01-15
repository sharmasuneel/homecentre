const { filterProducts } = require('./productUtility'); 

describe('filterProducts', () => {
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

    const result = filterProducts(key, value, products);
    expect(result).toEqual(expected);
  });

  it('should return an empty array if no products match the filter', () => {
    const key = 'category';
    const value = 'toys';
    const expected = [];

    const result = filterProducts(key, value, products);
    expect(result).toEqual(expected);
  });

  it('should filter products by name', () => {
    const key = 'name';
    const value = 'Chair';
    const expected = [
      { id: 3, category: 'furniture', name: 'Chair' },
    ];

    const result = filterProducts(key, value, products);
    expect(result).toEqual(expected);
  });
});