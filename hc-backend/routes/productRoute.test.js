
const request = require('supertest');
const express = require('express');
const router = require('./productRoute');
const productsData = require('../metadata/productList.json');
const { getFilterProducts, searchProducts } = require('../utils/productUtility');

const app = express();
app.use('/products', router);

describe('Products Routes', () => {
  it('should return the list of products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(productsData);
  });

  it('should return filtered products based on category and value', async () => {
    const category = 'category';
    const value = 'beauty';
    const filteredProducts = getFilterProducts(category, value, productsData.products);

    const response = await request(app).get(`/products/${category}/${value}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(filteredProducts);
  });

  it('should return filtered products based on query', async () => {
    const query = { category: 'beauty', brand: 'Essence'}
    const category= 'beauty'
    const brand= 'Essence'
    const filteredProducts = searchProducts(query, productsData.products);

    const response = await request(app).get(`/products/query?category=${category}&brand=${brand}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(filteredProducts);
  });

  it('should return the product details with specific id ', async () => {
    const response = await request(app).get('/products/30');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(productsData.products[29]);
  });

  it('should return the error with status code 404 if porduct is not found', async () => {
    const response = await request(app).get('/products/35324123123');
    expect(response.status).toBe(404);
    expect(response.error.text).toContain('Cannot GET /products/35324123123');
  });
});