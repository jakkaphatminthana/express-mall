/**
 * @swagger
 * components:
 *   schemas:
 *     ProductQuery:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *           description: Page number (must be positive integer)
 *         pageSize:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *           description: Page size per request (must be positive integer)
 *         search:
 *           type: string
 *           example: "phone"
 *           description: Keyword to filter products
 *         isActive:
 *           type: boolean
 *           example: true
 *           description: Filter products by active status
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: iPhone 15 Pro
 *         description:
 *           type: string
 *           nullable: true
 *           example: Latest Apple smartphone with titanium design
 *         price:
 *           type: number
 *           example: 39900
 *         stock:
 *           type: integer
 *           example: 100
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2025-07-31T09:12:14.531Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: '2025-07-31T09:12:14.531Z'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 */
