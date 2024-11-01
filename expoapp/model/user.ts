type UserRole = "USER" | "ADMIN";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userRole: UserRole;
}
