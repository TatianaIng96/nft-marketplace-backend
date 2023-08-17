import { PrismaClient } from "@prisma/client";
import { User } from "./user.types"

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    });
    return users;
}

export const getSingleUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    });
    return user;
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return user;
}
export const createUser = async (user: User) => {
    const data = user;

    const createdUser = await prisma.user.create({
        data,
        select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    });

    return createdUser;
}

export const updateUser = async (id: string, body: User) => {
    const data = body;

    const updatedUser = await prisma.user.update({
        where: { id },
        data,
        select: {
            firstName: true,
            lastName: true,
            email: true,
            bio: true,
            role: true,
            gender: true,
            currency: true,
            phone: true,
            location: true,
            address: true,
            image: true,
            cover: true,
            nftOwner: true,
            nft: true,
            bid: true,
            like: true,
        }
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