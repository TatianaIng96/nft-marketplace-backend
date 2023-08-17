import { Request, Response } from "express-serve-static-core";

import {
  getAllNftOwners,
  getNftOwnerById,
  createNftOwner
} from './nft_owner.service';

export const getAllNftOwnersHandler = async (_: Request, res: Response) => {
  const nftOwners = await getAllNftOwners()

  return res.status(200).json(nftOwners)
}

export const getNftOwnerByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.body
  const nftOwner = await getNftOwnerById(id)

  return res.status(200).json(nftOwner)
}

export const createNftOwnerHandler = async (req: Request, res: Response) => {
  const { data } = req.body
  const newNftOwner = await createNftOwner(data)

  return res.status(201).json(newNftOwner)
}