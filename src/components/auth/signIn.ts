import { compare } from "bcrypt";
import RequestHandler from "../common/RequestHandler";
import { mockData } from "./user";

const signIn: RequestHandler<Request> = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required." });
  }

  const user = mockData.find((x) => x.name === name);
  if (!user) {
    return res.status(400).json({ error: "Sign in failed." });
  }

  const match = await compare(password, user?.passwordHash);
  if (!match) {
    return res.status(400).json({ error: "Sign in failed." });
  }

  return res.status(200).json();
};

type Request = {
  name: string;
  password: string;
};

export default signIn;
