import RequestHandler from "src/components/common/RequestHandler";
import User from "./data/User";
import ApiUser from "./models/ApiUser";
import { toApiUser } from "./models/mappers";

const getUsers: RequestHandler<undefined, Response> = async (_req, res) => {
  const users: ApiUser[] = (await User.find().lean()).map((x) => toApiUser(x));
  res.status(200).json(users);
};

type Response = ApiUser[];

export default getUsers;
