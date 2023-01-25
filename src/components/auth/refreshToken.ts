import { verify, VerifyCallback } from "jsonwebtoken";
import env from "src/env";
import RequestHandler from "src/components/common/RequestHandler";
import generateAccessToken from "./common/generateAccessToken";
import JwtPayload from "./common/JwtPayload";
import User from "./data/User";
import { isRole } from "./models/Role";

const refreshToken: RequestHandler<undefined, Response> = async (req, res) => {
  const refreshToken: string = req.cookies["jwt"];
  if (!refreshToken || typeof refreshToken !== "string") {
    return res.sendStatus(401);
  }

  const user = await User.findOne({ refreshToken: refreshToken }).lean();

  if (!user) {
    return res.sendStatus(403);
  }

  const callback: VerifyCallback<string | JwtPayload> = (error, decoded) => {
    if (error) {
      return res.sendStatus(403);
    }

    if (!decoded || typeof decoded === "string") {
      return res.sendStatus(500);
    }

    if (decoded.username !== user.name) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken({
      roles: user.roles.filter(isRole),
      username: user.name,
    });

    return res.json({ accessToken });
  };

  return verify(refreshToken, env.refreshTokenSecret, callback);
};

type Response = {
  accessToken: string;
};

export default refreshToken;
