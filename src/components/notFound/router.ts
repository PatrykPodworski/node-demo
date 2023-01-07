import express from "express";
import getNotFound from "./getNotFound";

const notFoundRouter = express.Router();

notFoundRouter.all("*", getNotFound);

export default notFoundRouter;
