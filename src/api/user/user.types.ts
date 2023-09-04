import { User as UserModel } from "@prisma/client";

export type User = UserModel;

export type CreatedUser = Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'validateToken' | 'tokenExpires'>