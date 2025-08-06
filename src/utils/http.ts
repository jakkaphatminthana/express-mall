import { Response } from 'express';
import { Pagination } from '@/types/pagination';
import { HttpError } from './errorUtils';

export interface ResponseBase {
  success: boolean;
}

export interface SuccessResponse<T> extends ResponseBase {
  data?: T;
  message?: string;
  pagination?: Pagination;
}

export interface ErrorResponse extends ResponseBase {
  error: ErrorDetailResponse;
}
export interface ErrorDetailResponse {
  code: string;
  message: string;
  details: any;
}

function success<T>(
  res: Response,
  status: number,
  data?: T,
  message?: string,
  pagination?: Pagination,
): Response<SuccessResponse<T>> {
  return res.status(status).json({
    success: true,
    data,
    message,
    pagination,
  });
}

export const sendSuccess = {
  ok<T>(res: Response, data?: T, message?: string): Response {
    return success(res, 200, data, message);
  },

  created<T>(res: Response, data: T, message?: string): Response {
    return success(res, 201, data, message);
  },

  pagination<T>(
    res: Response,
    data: T,
    pagination: Pagination,
    message?: string,
  ): Response {
    return success(res, 200, data, message, pagination);
  },
};

// Error
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
        details: [error],
      },
    });
  },
};
