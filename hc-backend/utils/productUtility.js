/**
 * Filters products based on a given key and value.
 * 
 * @param {string} key - The key to filter products by.
 * @param {string} value - The value to match for the given key.
 * @param {Array<Object>} products - The list of products to filter.
 * @returns {Array<Object>} - The filtered list of products.
 */
const filterProducts = (key, value, products) => {
   return products.filter(product => product[key] === value);
};

module.exports = { filterProducts };
