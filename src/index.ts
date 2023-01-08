import express from "express";
import path from "path";
import env from "./env";
import corsMiddleware from "./middleware/corsMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import loggerMiddleware from "./middleware/loggerMiddleware";
import authRouter from "./components/auth/router";
import notFoundRouter from "./components/notFound/router";

const app = express();
const PORT = process.env["PORT"] || 3001;

app.use(loggerMiddleware);
app.use(corsMiddleware());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(env.appRoot, "public")));

app.use(authRouter);
app.use(notFoundRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
