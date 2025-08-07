/**
 * Pagination Response
 * @typedef {Object} PaginationResponse
 * @property {number} currentPage - The current page number
 * @property {number} totalPage - The total number of pages available
 * @property {number} totalItem - The total number of items across all pages
 */

/**
 * Error Response
 * @typedef {Object} ErrorResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {ErrorDetails} error - Details about the error that occurred
 */

/**
 * ErrorDetails
 * @typedef {Object} ErrorDetails
 * @property {string} message - A message describing the error
 * @property {string} code - An error code that can be used for debugging
 * @property {string} [details] - Additional details about the error (optional)
 */
