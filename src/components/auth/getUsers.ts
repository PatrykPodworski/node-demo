import RequestHandler from "../common/RequestHandler";
import User, { mockData } from "./user";

const getUsers: RequestHandler<undefined, Response> = (_req, res) => {
  res.status(200).json(mockData);
};

type Response = User[];

export default getUsers;
