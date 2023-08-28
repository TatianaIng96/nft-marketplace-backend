import { Request, Response } from "express";

import {
  getProfileImage,
  createProfileImage,
  updateProfileimage,
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
    res.status(201).json(createImage);
  } catch (error) {
    res.status(401).json({ error: "Image coudn't be created" });
  };
};

export const updateProfileimageHandler = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { url } = req.body;

  try {
    const updateImage = await updateProfileimage(id, url);
    res.status(201).json(updateImage);
  } catch (error) {
    res.status(400).json({ error: "Image coudn't be updated" });
  };
};
