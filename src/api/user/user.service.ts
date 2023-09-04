import { PrismaClient } from "@prisma/client";
import { User } from "./user.types"

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
            profileImage: true,
            coverImage: true,
        }
    });
    return users;
}

export const getSingleUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            bio: true,
            gender: true,
            currency: true,
            phone: true,
            location: true,
            address: true,
            profileImage: true,
            coverImage: true,
            transaction: true,
            nftOwner: true,
            bid: true,
            like: {
                select: {
                    nft: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    id: false,
                    userId: false,
                    nftId: false,
                    createdAt: false,
                    updateAt: false
                }
            },
            nft: true
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
            id: true,
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
        where: {
            id
        },
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
            profileImage: {
                select: {
                    url: true
                }
            },
            coverImage: {
                select: {
                    url: true
                }
            },
            nftOwner: true,
            nft: true,
            bid: true,
            like: true,
        }
    });

    return updatedUser;
}

export const updatePassword = async (id: string, password: string) => {
    const updateUserPassword = await prisma.user.update({
        where: { id },
        data: {
            password: password,
        },
    })

    return updateUserPassword;
};

export const deleteUser = async (id: string) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id
        }
    });

    return deletedUser;
}