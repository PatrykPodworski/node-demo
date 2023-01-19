import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import env from "src/env";
import RequestHandler from "../common/RequestHandler";
import generateAccessToken from "./common/generateAccessToken";
import User, { setUsers, users } from "./models/User";

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

  const { accessToken, refreshToken } = generateTokens(user);

  setUsers(users.map((x) => (x.id === user.id ? { ...x, refreshToken } : x)));

  return res
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: env.refreshTokenExpirationTime * 1000,
    })
    .status(200)
    .json({ accessToken });
};

const generateTokens = (user: User) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = sign(
    {
      username: user.name,
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
