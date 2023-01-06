import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).send("Something broke!");
};
