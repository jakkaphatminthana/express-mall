import { Request, Response } from 'express';

export type RequestBodyType<A, B, C> = Request<B, any, A, C>;

export type ControllerBaseFunctionType<A, B, C> = (
  request: RequestBodyType<A, B, C>,
  response: Response,
) => void;
