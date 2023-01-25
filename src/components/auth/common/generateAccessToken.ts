import { sign } from "jsonwebtoken";
import env from "src/env";
import { TokenUser } from "./JwtPayload";

const generateAccessToken = (user: TokenUser) => {
  const accessToken = sign(
    {
      username: user.username,
      roles: user.roles,
    },
    env.accessTokenSecret,
    { expiresIn: env.accessTokenExpirationTime }
  );

  return accessToken;
};

export default generateAccessToken;
