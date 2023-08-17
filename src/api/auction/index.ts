import { Router } from "express";

import { isAuthenticated, hasRole } from "../../auth/auth.controller";

import {
    getAllAuctionsHandler,
    getSingleAuctionHandler,
    createAuctionHandler
} from "./auction.controller"

const router = Router();

router.get('/', isAuthenticated, hasRole('ADMIN'), getAllAuctionsHandler);
router.get('/:id', isAuthenticated, getSingleAuctionHandler); // lo puede hacer admin y el usuario que la montó
router.post('/', isAuthenticated, hasRole('USER'), createAuctionHandler); // solamente el dueño del nft
// una subasta no se cambia ni se elimina, solo se termina! Hay que hacer modales para advertir
// eso antes de crear una subasta (o hacer una oferta)

export default router;