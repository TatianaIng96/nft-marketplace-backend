import { ProfileImage as ProfileImageModel } from "@prisma/client";

export interface ProfileUserImage extends ProfileImageModel {
  profileImage?: string
}