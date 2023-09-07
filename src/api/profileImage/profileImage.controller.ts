import { Request, Response } from "express";

import {
  getProfileImage,
  createProfileImage,
  updateProfileimage,
  getProfileImageByUserId,
  deleteProfileImage
} from "./profileImage.service";
import { User } from "../user/user.types";
import { AuthRequest } from "../../auth/auth.types";

export const getProfileImageHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profileImage = await getProfileImage(id);
    res.status(200).json(profileImage);
  } catch (error) {
    res.status(400).json({ error: "Image coudn't be obtained" });
  };
};

export const createProfileImageHandler = async (req: AuthRequest, res: Response) => {
  const { url } = req.body;
  const { id } = req.user as User;

  try {
    const createImage = await createProfileImage(url, id);
    res.setHeader('Access-Control-Allow-Origin', 'https://nft-marketplace-frontend-9z7xtntur-tatianaing96.vercel.app/edit-profile-image');
    res.status(201).json(createImage);
  } catch (error) {
    res.status(401).json({ error: "Image coudn't be created" });
  };
};

export const updateProfileimageHandler = async (req: AuthRequest, res: Response) => {
  const { url } = req.body;
  const { id: userId } = req.user as User;
  try {
    const currentProfileImage = await getProfileImageByUserId(userId);

    if (!currentProfileImage) {
      return res.status(404).json({ message: 'Profile image not found' });
    }

    const { id } = currentProfileImage;

    await updateProfileimage(id, url);

    res.status(201).json({ message: 'Profile image updated successfully' });
  } catch (error) {
    res.status(400).json({ error: "Image couldn't be updated" });
  };
};

export const deleteProfileImageHandler = async (req: AuthRequest, res: Response) => {
  const { id: userId } = req.user as User;

  const currentProfileImage = await getProfileImageByUserId(userId);

  if (!currentProfileImage) {
    return res.status(404).json({ message: 'Profile image not found' });
  }

  const { id } = currentProfileImage;

  await deleteProfileImage(id);

  res.status(201).json({ message: 'Cover image deleted' });
}