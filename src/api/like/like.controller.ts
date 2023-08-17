import { Request, Response} from 'express';
import { createLike, deleteLike, getByLike } from './like.service';
import { AuthRequest } from '../../auth/auth.types';
import { User } from '../user/user.types';
import { Like } from './like.types';

export const getAllLikeHandler =async (req:Request, res: Response) => {
 const {nftId} = req.params
 const like = await getByLike(nftId);
 return res.status(200).json(like)
}

export const getCreateLikeHandler = async (req: AuthRequest, res: Response) => {
  const { nftId } = req.params  
  const { id } = req.user as User
  const data = {nftId,userId: id} as Like
  
  try {
    const like = await createLike(data)
    res.json(like);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo dar like al nft.' });
  }
}

export const getDeleteLikeHandler = async (req: AuthRequest, res: Response) => {
  const { nftId } = req.params  
  const { id } = req.user as User
  const data = {nftId,userId: id} as Like
  
  try {
    const like = await deleteLike(data)
    if (like.count === 0) {
      return res.status(404).json({ message: 'No se encontró el like para eliminar.' });
    }

    res.json({ message: 'Like eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo eliminar el like del nft.' });
  }
}