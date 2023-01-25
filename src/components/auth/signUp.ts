import { hash } from "bcrypt";
import RequestHandler from "../common/RequestHandler";
import User from "src/components/auth/data/User";

const signUp: RequestHandler<Request, Response> = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required." });
  }

  const duplicate = await User.findOne({ name: name }).lean();
  if (duplicate) {
    return res
      .status(400)
      .json({ error: `User with name ${name} already exists.` });
  }

  const passwordHash = await hash(password, 10);

  const result = await User.create({
    name: name,
    passwordHash: passwordHash,
  });

  return res.status(201).json({ id: result._id.toString() });
};

type Request = {
  name: string;
  password: string;
};

type Response = {
  id: string;
};

export default signUp;
