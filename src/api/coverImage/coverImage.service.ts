import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCoverImage = async (id: string) => {
    const coverImage = await prisma.coverImage.findUnique({
        where: { id }
    });

    return coverImage;
}

export const getCoverImageByUserId = async (userId: string) => {
    const coverImage = await prisma.coverImage.findFirst({
        where: { userId },
    });

    return coverImage;
}

export const createCoverImage = async (url: string, userId: string) => {
    const coverImage = await prisma.coverImage.create({
        data: {
            url,
            userId
        },
        include: {
            user: {
                select: {
                    coverImage: true
                }
            }
        }
    });

    return coverImage;
}

export const updateCoverImage = async (url: string, id: string) => {
    const coverImage = await prisma.coverImage.update({
        where: { id },
        data: { url }
    });

    return coverImage;
}

export const deleteCoverImage = async (id: string) => {
    await prisma.coverImage.delete({ where: { id } });
}