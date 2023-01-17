import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import env from "src/env";
import RequestHandler from "../common/RequestHandler";
import generateAccessToken from "./common/generateAccessToken";
import { setUsers, users } from "./common/User";

const signIn: RequestHandler<Request, Response> = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required." });
  }

  const user = users.find((x) => x.name === name);
  if (!user) {
    return res.status(400).json({ error: "Sign in failed." });
  }

  const match = await compare(password, user?.passwordHash);
  if (!match) {
    return res.status(400).json({ error: "Sign in failed." });
  }

  const { accessToken, refreshToken } = generateTokens(user.name);

  setUsers(
    users.map((x) => (x.id === user.id ? { ...x, refreshToken } : user))
  );

  return res
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: env.refreshTokenExpirationTime * 1000,
    })
    .status(200)
    .json({ accessToken });
};

const generateTokens = (name: string) => {
  const accessToken = generateAccessToken(name);
  const refreshToken = sign(
    {
      username: name,
    },
    env.refreshTokenSecret,
    { expiresIn: env.refreshTokenExpirationTime }
  );

  return { accessToken, refreshToken };
};

type Request = {
  name: string;
  password: string;
};

type Response = {
  accessToken: string;
};

export default signIn;
