/**
 * Filters products based on a given key and value.
 * 
 * @param {string} key - The key to filter products by.
 * @param {string} value - The value to match for the given key.
 * @param {Array<Object>} products - The list of products to filter.
 * @returns {Array<Object>} - The filtered list of products.
 */
const getFilterProducts = (key, value, products) => {
   return products.filter(product => { 
      console.log(key, product[key].toString(), value, value.toString())
      return product[key].toString() === value.toString()
   });
};

/**
 * Search products based on a given query.
 * 
 * @param {Object} quesry - request query object with key valy pair
 * @returns {Array<Object>} - The filtered list of products.
 */
const searchProducts = (query, products) => {
   let filterProducts = products
   for(const key in query) {
      filterProducts = getFilterProducts(key, query[key], filterProducts)
   }
   return filterProducts
};


module.exports = { getFilterProducts, searchProducts };
