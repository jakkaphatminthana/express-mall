import { Request, Response } from 'express';

/* 
body: A;
params: B;
query: C; 
*/
export type RequestBodyType<A, B, C> = Request<B, any, A, C>;

export type ControllerBaseFunctionType<A, B, C> = (
  request: RequestBodyType<A, B, C>,
  response: Response,
) => void;
