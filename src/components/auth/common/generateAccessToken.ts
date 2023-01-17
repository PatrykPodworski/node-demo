import { sign } from "jsonwebtoken";
import env from "src/env";

const generateAccessToken = (name: string) => {
  const accessToken = sign(
    {
      username: name,
    },
    env.accessTokenSecret,
    { expiresIn: env.accessTokenExpirationTime }
  );

  return accessToken;
};

export default generateAccessToken;
