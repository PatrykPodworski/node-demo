import { sign } from "jsonwebtoken";
import env from "src/env";
import User from "../models/User";

const generateAccessToken = (user: User) => {
  const accessToken = sign(
    {
      username: user.name,
      roles: user.roles,
    },
    env.accessTokenSecret,
    { expiresIn: env.accessTokenExpirationTime }
  );

  return accessToken;
};

export default generateAccessToken;
