import { RequestHandler } from "express";

const logger: RequestHandler = (req, _res, next) => {
  console.log(
    req.headers.origin,
    req.method,
    req.path,
    new Date().toLocaleTimeString()
  );
  next();
};

export default logger;
