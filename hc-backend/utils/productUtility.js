/**
 * Filters products based on a specific key and value.
 * @param {string} key - The key to filter by.
 * @param {string|number} value - The value to filter by.
 * @param {Array<Object>} products - The list of products to filter.
 * @returns {Array<Object>} - The filtered list of products.
 */
const getFilterProducts = (key, value, products) => {
    return products.filter(product => product[key].toString() === value.toString());
};

/**
 * Searches products based on a query object.
 * @param {Object} query - The query object containing key-value pairs to filter by.
 * @param {Array<Object>} products - The list of products to search.
 * @returns {Array<Object>} - The filtered list of products.
 */
const searchProducts = (query, products) => {
    let filterProducts = products;
    for (const key in query) {
        filterProducts = getFilterProducts(key, query[key], filterProducts);
    }
    return filterProducts;
};

/**
 * Searches products based on a payload object using the filterData function.
 * @param {Object} payload - The payload object containing filter criteria.
 * @param {Array<Object>} products - The list of products to search.
 * @returns {Array<Object>} - The filtered list of products.
 */
const searchProductsV1 = (payload, products) => {
    return filterData(payload, products);
};

/**
 * Filters data based on a payload object.
 * @param {Object} payload - The payload object containing filter criteria.
 * @param {Array<Object>} data - The list of data to filter.
 * @returns {Array<Object>} - The filtered list of data.
 */
function filterData(payload, data) {
    return data.filter(item => {
        // Check category
        if (payload.category && item.category !== payload.category) {
            return false;
        }
        // Check brand
        if (payload.brand && !payload.brand.includes(item.brand)) {
            return false;
        }
        // Check price
        if (payload.price) {
            if (item.price < payload.price.min || item.price > payload.price.max) {
                return false;
            }
        }
        // Check review rating
        if (payload.reviewRating) {
            const reviewRatings = item.reviews.map(review => review.rating);
            if (!reviewRatings.some(rating => rating >= payload.reviewRating)) {
                return false;
            }
        }
        return true;
    });
}

/**
* Filters products based on keyword search in brands and categories.
* @param {string} keywordSearch - The search keywords.
* @param {Array<Object>} products - The list of products to filter.
* @returns {Array<Object>} - The filtered list of products.
*/
function filterProductsByKeywords(keywordSearch, products) {
    const keywords = keywordSearch.toLowerCase().split(' ');
    return products.filter(product => {
        const productString = `${product.category}
        ${product.brand || ''}
        `.toLowerCase(); // TODO: Add more ..

        // Check if all keywords are present in the product string
        return keywords.every(keyword => productString.includes(keyword));
    });
}

module.exports = { getFilterProducts, searchProducts, searchProductsV1, filterProductsByKeywords };
