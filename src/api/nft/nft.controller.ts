import { Request, Response } from 'express';

import { AuthRequest } from '../../auth/auth.types';
import { User } from '../user/user.types';

import {
  getAllNft,
  getNftById,
  createNft,
  updateNFT,
  deleteNft,
  filterCategory,
  filterCollection
} from './nft.service';
import { createNftOwner } from '../nftOwner/nftOwner.service';
import { NftOwnerRelation } from '../nftOwner/nftOwner.types';
import { getCategoryByName } from '../category/category.service';
import { getCollectionByName } from '../collection/collection.service';
import { Nft } from './nft.types';
import { getLast3Images } from '../nft-image/nft-image.service';
import { createImageForNft } from '../imageForNft/imageForNft.service';

export const getAllNftHandler = async (req: Request, res: Response) => {
 // const nfts = await getAllNft();
 const { likes, category, collection, price } = req.query;
 const categoryId = filterCategory(category ? category.toString() : undefined)
 const collectionId = filterCollection(collection ? collection.toString() : undefined)
 const priceInt = price ? parseInt(price.toString()): undefined;
 

  if (!likes && !category && !collection && !price) {
  // Si no se proporcionan parámetros de consulta, obtén todos los NFT
    const allNfts = await getAllNft();
    return res.status(200).json(allNfts);
  }
  
  const nfts = await getAllNft(likes ? likes.toString() : undefined, categoryId, collectionId, priceInt);
  return res.status(200).json(nfts);
}

export const getNftHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  const nft = await getNftById(id)
  if (!nft) {
    return res.status(404).json({
      message: 'nft not found',
    });
  }

  const nftWithOrganizedImages = {
    ...nft,
    imageForNft: nft.imageForNft.map((image) => image.nftImage.url)
  }

  return res.json(nftWithOrganizedImages);
}

export const createNftHandler = async (req: AuthRequest, res: Response) => {
  const data = req.body

  const category = await getCategoryByName(data.category);
  const collection = await getCollectionByName(data.collection);

  const { id } = req.user as User;

  const nftToReturn = {
    name: data.name,
    description: data.description,
    price: parseInt(data.price),
    royalty: parseInt(data.royalty),
    categoryId: category?.id,
    collectionId: collection?.id
  } as Nft;

  const nft = await createNft(nftToReturn, id);

  const dataRelation: NftOwnerRelation = {
    userId: id,
    nftId: nft.id
  }

  await createNftOwner(dataRelation);

  const last3Images = await getLast3Images();

  for (let i = 0; i < last3Images.length; i++) {
    await createImageForNft(nft.id, last3Images[i].id);
  }

  return res.status(201).json(nft)
}

export const updateNftHandler = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params
  const nft = await updateNFT(data, id)
  if (!nft) {
    return res.status(404).json({
      message: 'nft not found',
    });
  }
  return res.status(201).json(nft)
}

export const deleteNftHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const nft = await getNftById(id);

  if (!nft) {
    return res.status(404).json({
      message: 'Nft not found',
    });
  }

  await deleteNft(id);

  return res.json(nft);
}