import express from "express";
import { jwtMiddleware } from "../../middleware/jwtMiddleware";
import getUsers from "./getUsers";
import signIn from "./signIn";
import signUp from "./signUp";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.get("/sign-in", signIn);
authRouter.get("/users", jwtMiddleware, getUsers);

export default authRouter;
