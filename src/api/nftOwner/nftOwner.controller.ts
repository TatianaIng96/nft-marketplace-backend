import { Request, Response } from "express-serve-static-core";

import {
  getAllNftOwners,
  getNftOwnerById,
  createNftOwner,
  updateNftOwner
} from './nftOwner.service';

export const getAllNftOwnersHandler = async (_: Request, res: Response) => {
  const nftOwners = await getAllNftOwners();

  return res.status(200).json(nftOwners);
};

export const getNftOwnerByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  const nftOwner = await getNftOwnerById(id);

  return res.status(200).json(nftOwner);
};

export const createNftOwnerHandler = async (req: Request, res: Response) => {
  const { data } = req.body;
  const newNftOwner = await createNftOwner(data);

  return res.status(201).json(newNftOwner);
};

export const updateNftOwnerHandler = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;
  const updateOwner = updateNftOwner(id, data);

  return res.status(201).json(updateOwner);
};
