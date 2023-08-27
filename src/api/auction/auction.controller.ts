import { Request, Response } from "express";

import {
    getAllAuctions,
    getSingleAuction,
    getAllAuctionsNft,
    createAuction
} from "./auction.service"

export const getAllAuctionsHandler = async (_: Request, res: Response) => {
    const auctions = await getAllAuctions();

    return res.status(200).json(auctions);
}

export const getSingleAuctionHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const auction = await getSingleAuction(parseInt(id));

    res.status(201).json(auction);
}
export const getSingleAuctionNftHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const auction = await getAllAuctionsNft(id);

    res.status(201).json(auction);
}

export const createAuctionHandler = async (req: Request, res: Response) => {
    const { body } = req;

    const auction = await createAuction(body);

    return res.status(201).json(auction);
}

/* export const updateAuctionHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { body } = req;

    const updatedAuction = await updateAuction(parseInt(id), body);

    return res.status(201).json(updatedAuction);
}

export const deleteAuctionHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedAuction = await deleteAuction(parseInt(id));

    return deletedAuction;
} */
