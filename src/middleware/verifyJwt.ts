import { verify, VerifyCallback } from "jsonwebtoken";
import RequestHandler from "../components/common/RequestHandler";
import env from "../env";
import JwtPayload from "../components/auth/common/JwtPayload";
import User from "src/components/auth/models/User";

export const verifyJwt: AuthenticatedRequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const callback: VerifyCallback<string | JwtPayload> = (error, decoded) => {
    if (error) {
      return res.sendStatus(403);
    }

    if (!decoded || typeof decoded === "string") {
      return res.sendStatus(500);
    }

    req.body = {
      ...req.body,
      user: { name: decoded.username, roles: decoded.roles },
    };
    return next();
  };

  verify(token, env.accessTokenSecret, callback);

  return;
};

type AuthenticatedRequest = {
  user: Pick<User, "name" | "roles">;
};

export type AuthenticatedRequestHandler<
  Request = undefined,
  Response = undefined
> = RequestHandler<Request | AuthenticatedRequest, Response>;
