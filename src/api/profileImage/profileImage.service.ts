import { PrismaClient } from "@prisma/client";
import { ProfileImage } from "./profileImage.types";

const prisma = new PrismaClient();

export const createProfileImage = async (inputData: ProfileImage) => {
  const newProfileImage = await prisma.profileImage.create({
    data: { ...inputData }
  });

  return newProfileImage;
};

export const updateProfileimage = async (id: string, inputData: ProfileImage) => {
  const updateImage = await prisma.profileImage.update({
    where: { id },
    data: { ...inputData }
  });

  return updateImage;
}

export const deleteProfileImage = async (id: string) => {
  const deleteImage = await prisma.profileImage.delete({
    where: { id }
  });

  return deleteImage;
};
