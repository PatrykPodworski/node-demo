import Role from "./Role";

type User = {
  id: string;
  name: string;
  passwordHash: string;
  refreshToken?: string | undefined;
  roles: Role[];
};

export let users: User[] = [
  {
    id: "123abca8-10fe-42fd-b2ab-e6fb72fd3ff6",
    name: "Patryk User",
    passwordHash:
      "$2b$10$zJGSuQnVg0NWranUNWIoPenSd20E5cHzzGqPF6mYgf.Twm4dD2GPy",
    roles: ["User"],
  },
  {
    id: "123b0d1d-f48f-40cb-bd22-3e9c0b4416dd",
    name: "Patryk Editor",
    passwordHash:
      "$2b$10$zJGSuQnVg0NWranUNWIoPenSd20E5cHzzGqPF6mYgf.Twm4dD2GPy",
    roles: ["Editor"],
  },
  {
    id: "123c19e4-46b1-4dcf-abd1-cd12eeab5e75",
    name: "Patryk Admin",
    passwordHash:
      "$2b$10$zJGSuQnVg0NWranUNWIoPenSd20E5cHzzGqPF6mYgf.Twm4dD2GPy",
    roles: ["Admin"],
  },
];

export const setUsers = (newUsers: User[]) => {
  users = newUsers;
};

export default User;
