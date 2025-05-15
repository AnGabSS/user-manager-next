export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  eole: "ADMIN" | "USER"
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date
}