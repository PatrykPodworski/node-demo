import express from "express";
import getUsers from "./getUsers";
import signIn from "./signIn";
import signUp from "./signUp";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.get("/sign-in", signIn);
authRouter.get("/users", getUsers);

export default authRouter;
