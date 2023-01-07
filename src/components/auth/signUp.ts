import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import RequestHandler from "../common/RequestHandler";
import { mockData } from "./user";

const signUp: RequestHandler<Request, Response> = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required." });
  }

  if (mockData.find((x) => x.name === name)) {
    return res
      .status(400)
      .json({ error: `User with name ${name} already exists.` });
  }

  const id = randomUUID();
  const passwordHash = await hash(password, 10);
  mockData.push({ id, name, passwordHash });

  return res.status(201).json({ id });
};

type Request = {
  name: string;
  password: string;
};

type Response = {
  id: string;
};

export default signUp;
