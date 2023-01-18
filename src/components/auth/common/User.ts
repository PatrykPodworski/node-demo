type User = {
  id: string;
  name: string;
  passwordHash: string;
  refreshToken?: string | undefined;
};

export let users: User[] = [];
export const setUsers = (newUsers: User[]) => {
  users = newUsers;
};

export default User;
