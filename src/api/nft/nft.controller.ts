import { Request, Response, response } from 'express';

import { 
    getAllNft,
    getNftById, 
    createNft,
    updateNFT,
    deleteNft
} from './nft.service';

export const getAllNftHandler =async (_:Request, res: Response) => {
    const nft = await getAllNft()

    return res.status(200).json(nft)
}

export const getNftHandler = async (req:Request, res: Response) => {
    const { id } = req.params
    const nft = await getNftById(id)
    if (!nft) {
        return res.status(404).json({
          message: 'nft not found',
        });
    }
    
    return res.json(nft);
}

export const createNftHandler =async (req: Request, res:Response) => {
    const data = req.body
    const nft = await createNft(data)

    return res.status(201).json(nft)
}

export const updateNftHandler =async (req: Request, res:Response) => {
    const data = req.body;
    const { id } = req.params
    const nft = await updateNFT(data,id)
    if (!nft) {
        return res.status(404).json({
          message: 'nft not found',
        });
    }
    return res.status(201).json(nft)
}

export const deleteNftHandler= async(req: Request, res: Response) => {
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