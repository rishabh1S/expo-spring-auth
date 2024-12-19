type UserRole = "USER" | "ADMIN";

export interface User {
  email: string;
  password: string;
  userRole: UserRole;
}
