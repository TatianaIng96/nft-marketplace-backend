import { Request, Response} from 'express';
import { createLike, getAllLike } from './like.service';
import { AuthRequest } from '../../auth/auth.types';
import { User } from '../user/user.types';

export const getAllLikeHandler =async (_:Request, res: Response) => {
 const like = await getAllLike();
 return res.status(200).json(like)
}

export const getCreateLikeHandler = async (req: AuthRequest, res: Response) => {
  const { nftId } = req.params  
  const { id } = req.user as User

  try {
    const like = await createLike(nftId,id)
    res.json(like);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo dar like al nft.' });
  }
}