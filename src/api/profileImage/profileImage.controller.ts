import { Request, Response } from "express";

import {
  createProfileImage,
  updateProfileimage,
  deleteProfileImage
} from "./profileImage.service";

export const createProfileImageHandler = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const createImage = await createProfileImage(data);
    res.status(201).json(createImage);
  } catch (error) {
    res.status(401).json({ error: "Image coudn't be created" });
  };
};

export const updateProfileimageHandler = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const updateImage = await updateProfileimage(id, data);
    res.status(202).json(updateImage);
  } catch (error) {
    res.status(400).json({ error: "Image coudn't be updated" });
  };
};

export const deleteProfileImageHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteImage = await deleteProfileImage(id);
    res.status(202).json(deleteImage);
  } catch (error) {
    res.status(400).json({ error: "Image coudn't be deleted" });
  };
};
