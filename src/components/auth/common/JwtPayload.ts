import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

type JwtPayload = DefaultJwtPayload | { username: string };

export default JwtPayload;
