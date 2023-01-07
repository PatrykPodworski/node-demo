import { RequestHandler as ExpressRequestHandler } from "express";

type RequestHandler<
  Request = undefined,
  Response = undefined
> = ExpressRequestHandler<{}, Response | ErrorResponse, Partial<Request>>;

type ErrorResponse = { error: string };

export default RequestHandler;
