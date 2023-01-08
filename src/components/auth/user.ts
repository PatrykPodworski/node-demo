type User = {
  id: string;
  name: string;
  passwordHash: string;
  refreshToken?: string;
};

export let users: User[] = [];
export const setUsers = (newUsers: User[]) => {
  users = newUsers;
};

export default User;
