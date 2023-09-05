import { User as UserModel } from "@prisma/client";

export type User = UserModel;

export type CreatedUser = Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'validateToken' | 'tokenExpires'>

export interface UserWithPassword extends User {
  password: string,
};