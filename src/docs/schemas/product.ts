/**
 * ListProdctsResponse Schema
 * @typedef {Object} ListProductsResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {Product[]} data - Array of products
 * @property {PaginationResponse} pagination - Pagination details for the product list
 */

/**
 * Product Schema
 * @typedef {Object} Product
 * @property {string} id - Unique identifier for the product
 * @property {string} name - Name of the product
 * @property {string} description - Description of the product
 * @property {number} price - Price of the product
 * @property {number} stock - Stock quantity of the product
 * @property {boolean} isActive - Whether the product is active
 * @property {string} createdAt - Creation date of the product
 * @property {string} updatedAt - Last update date of the product
 */
