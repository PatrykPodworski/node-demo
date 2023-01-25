import Role from "./Role";

type ApiUser = {
  id: string;
  name: string;
  passwordHash: string;
  refreshToken?: string | undefined;
  roles: Role[];
};

export default ApiUser;
