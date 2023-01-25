import express from "express";
import path from "path";
import env from "./env";
import configureCors from "./middleware/configureCors";
import { errorHandler } from "./middleware/errorHandler";
import logger from "./middleware/logger";
import authRouter from "./components/auth/router";
import notFoundRouter from "./components/notFound/router";
import cookieParser from "cookie-parser";
import { verifyJwt } from "./middleware/verifyJwt";
import mealsRouter from "./components/meals/router";
import credentials from "./middleware/credentials";
import { connection } from "mongoose";
import configureDatabase from "./middleware/configureDatabase";

const app = express();
const PORT = process.env["PORT"] || 3001;

configureDatabase();

app.use(logger);
app.use(credentials);
app.use(configureCors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(env.appRoot, "public")));

// public routes
app.use(authRouter);

app.use(verifyJwt);

// private routes
app.use(mealsRouter);

app.use(notFoundRouter);

app.use(errorHandler);

connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
