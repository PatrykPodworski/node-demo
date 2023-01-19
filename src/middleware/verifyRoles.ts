import Role from "src/components/auth/models/Role";
import { AuthenticatedRequestHandler } from "./verifyJwt";

const verifyRoles = (allowedRoles: Role[]): AuthenticatedRequestHandler => {
  return (req, res, next) => {
    const userRoles = req.body?.user?.roles;
    if (!userRoles) {
      return res.sendStatus(403);
    }

    const hasAccess = !!userRoles.find((x) => allowedRoles.includes(x));
    if (!hasAccess) {
      return res.sendStatus(403);
    }

    return next();
  };
};

export default verifyRoles;
