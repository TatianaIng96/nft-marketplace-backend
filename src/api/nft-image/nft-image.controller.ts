import { Request, Response } from 'express';
import {
  getAllNftImage,
  getSingleNftImage,
  createNftImage,
  deleteNftImage
} from './nft-image.service';

import { NftImage, NftImageWithName } from './nft-image.types';

export const getAllImageHandler = async (req: Request, res: Response) => {
  const nftImage = await getAllNftImage();
  return res.status(200).json(nftImage);
}
export const getSingleImageHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const nftImage = await getSingleNftImage(id);
    return res.status(200).json(nftImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo obtener la imagen al nft.' });
  }

}

export const createImageHandler = async (req: Request, res: Response) => {
  const data = req.body as NftImage;

  try {
    const nftImage = await createNftImage(data);

    res.status(200).json(nftImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo guardar la imagen al nft.' });
  }
}

export const getDeleteImageHandler = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const nftImage = await deleteNftImage(id);
    res.status(200).json({ message: 'Imagen eliminada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo eliminar la imagen del nft.' });
  }
}