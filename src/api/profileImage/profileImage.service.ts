import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfileImage = async (id: string) => {
  const profileImage = await prisma.profileImage.findUnique({
    where: {
      id
    }
  });

  return profileImage;
}

export const getProfileImageByUserId = async (userId: string) => {
  const profileImage = await prisma.profileImage.findFirst({
    where: { userId },
  });

  return profileImage;
}

export const createProfileImage = async (url: string, userId: string) => {
  const newProfileImage = await prisma.profileImage.create({
    data: {
      url,
      userId
    },
    include: {
      user: {
        select: {
          profileImage: true
        }
      }
    }
  });

  return newProfileImage;
};

export const updateProfileimage = async (id: string, url: string) => {
  const updateImage = await prisma.profileImage.update({
    where: { id },
    data: { url }
  });

  return updateImage;
};

export const deleteProfileImage = async (id: string) => {
  await prisma.profileImage.delete({ where: { id } });
}