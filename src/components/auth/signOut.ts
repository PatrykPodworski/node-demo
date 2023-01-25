import { Response } from "express";
import RequestHandler from "src/components/common/RequestHandler";
import User from "./data/User";

const signOut: RequestHandler = async (req, res) => {
  const refreshToken: string = req.cookies["jwt"];
  if (!refreshToken || typeof refreshToken !== "string") {
    return res.sendStatus(200);
  }

  const user = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!user) {
    return clearCookie(res);
  }

  user.refreshToken = undefined;
  await user.save();
  return clearCookie(res);
};

const clearCookie = (res: Response) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  return res.sendStatus(200);
};

export default signOut;
