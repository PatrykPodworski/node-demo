const roles = ["Admin", "Editor", "User"] as const;
type Role = typeof roles[number];
export default Role;
