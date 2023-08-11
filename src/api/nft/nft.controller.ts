import { Request, Response } from 'express';

import { getAllNft } from './nft.service';

export const getAllNftHandler =async (_:Request, res: Response) => {
    const nft = await getAllNft()

    return res.status(200).json(nft)
}