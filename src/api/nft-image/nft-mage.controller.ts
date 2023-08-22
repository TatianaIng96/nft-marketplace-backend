import { Request, Response} from 'express';
import { 
  getAllNftImage, 
  getSigleNftImage,
  createNftImage,
  deleteNftImage
} from './nft-image.service';
import { AuthRequest } from '../../auth/auth.types';
import { User } from '../user/user.types';
import { NftImage } from './nft-image.types';

export const getAllImageHandler =async (req:Request, res: Response) => {
 const nftImage = await getAllNftImage();
 return res.status(200).json(nftImage)
}
export const getSingleImageHandler =async (req:Request, res: Response) => {
 const {id} = req.params
 const nftImage = await getSigleNftImage(id);
 return res.status(200).json(nftImage)
}

export const getCreateImageHandler = async (req: Request, res: Response) => {
  const data = req.body as NftImage
  
  try {
    const nftImage = await createNftImage(data)
    res.json(nftImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo guardar la imagen al nft.' });
  }
}

export const getDeleteImageHandler = async (req: Request, res: Response) => {
  const { id } = req.params 
  
  try {
    const nftImage = await deleteNftImage(id)
    res.json({ message: 'Imagen eliminada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo eliminar la imagen del nft.' });
  }
}