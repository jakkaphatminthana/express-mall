/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorBadRequest:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 400
 *         message:
 *           type: string
 *           example: Bad Request
 *         errors:
 *           type: object
 *           additionalProperties: {}
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorNotFound:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 404
 *         message:
 *           type: string
 *           example: Not Found
 *         errors:
 *           type: object
 *           additionalProperties: {}
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorInternalServerError:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 500
 *         message:
 *           type: string
 *           example: Internal Server Error
 *         errors:
 *           type: object
 *           additionalProperties: {}
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pagination:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *           example: 1
 *         totalPage:
 *           type: integer
 *           example: 2
 *         totalItem:
 *           type: integer
 *           example: 6
 *
 */
