import { verify, VerifyCallback } from "jsonwebtoken";
import env from "src/env";
import RequestHandler from "../common/RequestHandler";
import generateAccessToken from "./common/generateAccessToken";
import JwtPayload from "./common/JwtPayload";
import { users } from "./models/User";

const refreshToken: RequestHandler<undefined, Response> = (req, res) => {
  const refreshToken: string = req.cookies["jwt"];
  if (!refreshToken || typeof refreshToken !== "string") {
    return res.sendStatus(401);
  }

  const user = users.find((x) => x.refreshToken === refreshToken);
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

    const accessToken = generateAccessToken(user);

    return res.json({ accessToken });
  };

  return verify(refreshToken, env.refreshTokenSecret, callback);
};

type Response = {
  accessToken: string;
};

export default refreshToken;
