import * as dotenv from "dotenv";

const env = () => {
  dotenv.config();
  console.log("envs configured");

  return {
    appRoot: __dirname,

    accessTokenSecret: process.env?.["ACCESS_TOKEN_SECRET"] ?? "",
    accessTokenExpirationTime: 60,

    refreshTokenSecret: process.env?.["REFRESH_TOKEN_SECRET"] ?? "",
    refreshTokenExpirationTime: 24 * 60 * 60,
  };
};

export default env();
