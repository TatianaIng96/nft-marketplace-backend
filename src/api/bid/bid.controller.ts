import { Request, Response} from 'express';
import { createBid, getAllBid } from './bid.service';
import { Bid } from './bid.types';


export const getAllBidHandler =async (req:Request, res: Response) => {
  const {autionId} = req.params
  const bid = await getAllBid(parseInt(autionId))
  return res.status(200).json(bid)
}

export const getCreateBidHandler =async (req:Request, res: Response) => {
  const data = req.body as Bid

  try {
    const bid = await createBid(data)
    res.json(bid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo crear la oferta al nft.' });
  }
  
}