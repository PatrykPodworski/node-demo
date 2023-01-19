import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import Role from "../models/Role";

type JwtPayload = DefaultJwtPayload | { username: string; roles: Role[] };

export default JwtPayload;
