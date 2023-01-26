export const roles = ["Admin", "Editor", "User"] as const;
const rolesSet = new Set<string>(roles);
type Role = typeof roles[number];

export const isRole = (role: string): role is Role => rolesSet.has(role);

export default Role;
