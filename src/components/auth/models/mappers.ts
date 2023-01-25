import { UserType } from "../data/User";
import { isRole } from "./Role";
import ApiUser from "./ApiUser";

export const toApiUser = (user: UserType): ApiUser => ({
  id: user._id.toString(),
  name: user.name,
  passwordHash: user.passwordHash,
  refreshToken: user.refreshToken,
  roles: user.roles.filter(isRole),
});
