import { PrismaClient } from "@prisma/client";
import { User } from "./user.types"

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    });
    return user;
}

export const createUser = async (user: User) => {
    const data = user;

    const createdUser = await prisma.user.create({
        data
    });

    return createdUser;
}

export const updateUser = async (id: string, body: User) => {
    const data = body;

    const updatedUser = await prisma.user.update({
        where: { id },
        data
    });
    return updatedUser;
}

export const deleteUser = async (id: string) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id
        }
    });
    return deletedUser;
}