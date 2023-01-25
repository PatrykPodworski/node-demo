import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import env from "src/env";
import RequestHandler from "src/components/common/RequestHandler";
import generateAccessToken from "./common/generateAccessToken";
import { TokenUser } from "./common/JwtPayload";
import { isRole } from "./models/Role";
import User from "./data/User";

const signIn: RequestHandler<Request, Response> = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required." });
  }

  const user = await User.findOne({ name: name });
  if (!user) {
    return res.status(400).json({ error: "Sign in failed." });
  }

  const match = await compare(password, user?.passwordHash);
  if (!match) {
    return res.status(400).json({ error: "Sign in failed." });
  }

  const { accessToken, refreshToken } = generateTokens({
    username: user.name,
    roles: user.roles.filter(isRole),
  });

  user.refreshToken = refreshToken;
  await user.save();

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

const generateTokens = (user: TokenUser) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = sign(
    {
      username: user.username,
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
