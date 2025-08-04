import { Request, Response } from 'express';

export type RequestBodyType<A, B, C> = Request & {
  body: A;
  params: B;
  query: C;
};

export type ControllerBaseFunctionType<A, B, C> = (
  request: RequestBodyType<A, B, C>,
  response: Response,
) => void;
