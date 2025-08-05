import { Response } from 'express';

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public errors?: object,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export const createError = {
  badRequest: (message = 'Validation failed', errors?: object) =>
    new HttpError(400, 'ValidationError', message, errors),

  unauthorized: (message = 'Unauthorized') =>
    new HttpError(401, 'AuthorizationError', message),

  forbidden: (message = 'Forbidden') =>
    new HttpError(403, 'AuthorizationError', message),

  notFound: (message = 'NotFound') =>
    new HttpError(404, 'NotFoundError', message),

  conflict: (message = 'Conflict') =>
    new HttpError(409, 'ConflictError', message),

  internal: (message = 'InternalServerError', errors: object) =>
    new HttpError(500, 'ServerError', message, errors),
};

export const sendError = {
  badRequest(res: Response, message = 'Validation failed', errors?: object) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'ValidationError',
        message,
        details: errors ?? {},
      },
    });
  },
  unauthorized(res: Response, message = 'Unauthorized') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'AuthorizationError',
        message,
      },
    });
  },
  forbidden(res: Response, message = 'Forbidden') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'ForbiddenError',
        message,
      },
    });
  },
  notFound(res: Response, message = 'NotFound') {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NotFoundError',
        message,
      },
    });
  },
  conflict(res: Response, message = 'Conflict') {
    return res.status(409).json({
      success: false,
      error: {
        code: 'ConflictError',
        message,
      },
    });
  },
  internalServer(
    res: Response,
    error: unknown,
    message = 'InternalServerError',
  ) {
    // Error from throw HttpError
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.errors ?? {},
        },
      });
    }

    return res.status(500).json({
      success: false,
      error: {
        code: 'InternalServerError',
        message,
        deatails: [error],
      },
    });
  },
};
