// // src/middlewares/errorHandler.ts
// import { Request, Response, NextFunction } from 'express';
// import { ValidationError } from 'sequelize';
// import { AppError } from '@/utils/errorUtils';

// export const errorHandler = (
//   error: AppError | ValidationError | Error,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void => {
//   let statusCode = 500;
//   let message = 'Internal Server Error';
//   let code = 'INTERNAL_SERVER_ERROR';
//   let details: any = undefined;

//   // Handle custom AppError
//   if (error instanceof AppError) {
//     statusCode = error.statusCode;
//     message = error.message;
//     code = error.code || `HTTP_${error.statusCode}`;
//   }
//   // Handle Sequelize validation errors
//   else if (error instanceof ValidationError) {
//     statusCode = 400;
//     message = 'Validation Error';
//     code = 'VALIDATION_ERROR';
//     details = error.errors.map((err) => ({
//       field: err.path,
//       message: err.message,
//       value: err.value,
//     }));
//   }
//   // Handle other known errors
//   else if (error.message) {
//     if (
//       error.message.includes('not found') ||
//       error.message.includes('Not found')
//     ) {
//       statusCode = 404;
//       code = 'NOT_FOUND';
//     } else if (
//       error.message.includes('already exists') ||
//       error.message.includes('duplicate') ||
//       error.message.includes('Invalid') ||
//       error.message.includes('cannot be negative') ||
//       error.message.includes('must be') ||
//       error.message.includes('required')
//     ) {
//       statusCode = 400;
//       code = 'BAD_REQUEST';
//     } else if (error.message.includes('Insufficient stock')) {
//       statusCode = 409;
//       code = 'INSUFFICIENT_STOCK';
//     }
//     message = error.message;
//   }

//   // Log error for debugging (in production, use proper logging like Winston)
//   console.error('Error:', {
//     message: error.message,
//     stack: error.stack,
//     statusCode,
//     code,
//     url: req.url,
//     method: req.method,
//     body: req.body,
//     timestamp: new Date().toISOString(),
//   });

//   // Send error response
//   const errorResponse: any = {
//     success: false,
//     code,
//     message,
//     timestamp: new Date().toISOString(),
//     path: req.url,
//     method: req.method,
//   };

//   if (details) {
//     errorResponse.details = details;
//   }

//   // Include stack trace in development
//   if (process.env.NODE_ENV === 'development') {
//     errorResponse.stack = error.stack;
//   }

//   res.status(statusCode).json(errorResponse);
// };

// // 404 handler for routes that don't exist
// export const notFoundHandler = (req: Request, res: Response): void => {
//   res.status(404).json({
//     success: false,
//     code: 'NOT_FOUND',
//     message: `Route ${req.method} ${req.url} not found`,
//     timestamp: new Date().toISOString(),
//   });
// };
