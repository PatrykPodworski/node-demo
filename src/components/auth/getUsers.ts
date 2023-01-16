import RequestHandler from "../common/RequestHandler";
import User, { users } from "./User";

const getUsers: RequestHandler<undefined, Response> = (_req, res) => {
  res.status(200).json(users);
};

type Response = User[];

export default getUsers;
