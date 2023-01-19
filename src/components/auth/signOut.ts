import { Response } from "express";
import RequestHandler from "../common/RequestHandler";
import { setUsers, users } from "./common/User";

const signOut: RequestHandler = (req, res) => {
  const refreshToken: string = req.cookies["jwt"];
  if (!refreshToken || typeof refreshToken !== "string") {
    return res.sendStatus(200);
  }

  const user = users.find((x) => x.refreshToken === refreshToken);
  if (!user) {
    return clearCookie(res);
  }

  const updatedUser = { ...user, refreshToken: undefined };
  const filteredUsers = users.filter((x) => x.id !== user.id);
  setUsers([...filteredUsers, updatedUser]);

  return clearCookie(res);
};

const clearCookie = (res: Response) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  return res.sendStatus(200);
};

export default signOut;
