import { Router } from "express";

import {
    getAllAuctionsHandler,
    getSingleAuctionHandler,
    createAuctionHandler,
    updateAuctionHandler,
    deleteAuctionHandler
} from "./auction.controller"

const router = Router();

router.get('/', getAllAuctionsHandler); // only admins
router.get('/:id', getSingleAuctionHandler);
router.post('/', createAuctionHandler); // comprobar funcionamiento
router.put('/:id', updateAuctionHandler);
router.delete('/:id', deleteAuctionHandler);

export default router;