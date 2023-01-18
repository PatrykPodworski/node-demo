import express from "express";
import { jwtMiddleware } from "src/middleware/jwtMiddleware";
import getUsers from "./getUsers";
import refreshToken from "./refreshToken";
import signIn from "./signIn";
import signOut from "./signOut";
import signUp from "./signUp";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.get("/sign-in", signIn);
authRouter.get("/users", jwtMiddleware, getUsers);
authRouter.get("/refresh-token", refreshToken);
authRouter.get("/sign-out", signOut);

export default authRouter;
