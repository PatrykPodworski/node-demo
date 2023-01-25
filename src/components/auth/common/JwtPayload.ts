import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import Role from "../models/Role";

type JwtPayload = DefaultJwtPayload | TokenUser;

export type TokenUser = { username: string; roles: Role[] };

export default JwtPayload;
