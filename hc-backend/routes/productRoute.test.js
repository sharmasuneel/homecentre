const request = require('supertest');
const express = require('express');
const router = require('./productRoute');
const productsData = require('../metadata/productList.json');
const { filterProducts } = require('../utils/productUtility');

const app = express();
app.use('/products', router);

describe('Products Routes', () => {
  it('should return the list of products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(productsData);
  });

  it('should return filtered products based on category and value', async () => {
    const category = 'categoryName'; // Replace with actual category
    const value = 'valueName'; // Replace with actual value
    const filteredProducts = filterProducts(category, value, productsData.products);

    const response = await request(app).get(`/products/${category}/${value}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(filteredProducts);
  });
});