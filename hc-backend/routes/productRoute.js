const express = require('express');
const { postData, getData } = require('../services/dataService');
const router = express.Router();
const productsData = require('../metadata/productList.json');
const { getFilterProducts, searchProducts, searchProductsV1 } = require('../utils/productUtility');

/**
 * @module routes/products
 */

/**
 * Route serving product list.
 * @name get/
 * @function
 * @memberof module:routes/products
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {JSON} - Returns the list of products
 */
router.get('/', async (req, res, next) => {
    // const response =  await getData('https://dummyjson.com/products');
    // return res.json(response)
    return res.json(productsData);
});

/**
 * Route serving filtered products based on category and value.
 * @name get/:category/:value
 * @function
 * @memberof module:routes/products
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {JSON} - Returns the filtered list of products
 */
router.get('/:category/:value', async (req, res, next) => {
    const key = req.params.category;
    const value = req.params.value;
    const products = getFilterProducts(key, value, productsData.products);
    return res.json(products);
});

router.get('/query', async (req, res, next) => {
    const products = searchProducts(req.query, productsData.products);
    return res.json(products);
});

router.post('/query', async (req, res, next) => {
    const products = searchProductsV1(req.body, productsData.products);
    return res.json(products);
});

module.exports = router;
