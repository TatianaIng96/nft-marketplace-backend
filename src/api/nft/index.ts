import { Router } from "express";

import {
    getAllNftHandler,
    getNftHandler,
    createNftHandler,
    updateNftHandler,
    deleteNftHandler,
    getNftUserHandler,
    getNftUserAuctionHandler,
    getNftUserOwnerHandler
} from "./nft.controller";
import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router()

router.get('/', getAllNftHandler)
router.get('/:id', getNftHandler)
router.get('/user/:id', getNftUserHandler)
router.get('/user/auction/:id', getNftUserAuctionHandler)
router.get('/user/owner/:id', getNftUserOwnerHandler)
router.post('/', isAuthenticated, hasRole('USER'), createNftHandler)
router.put('/:id', isAuthenticated, hasRole('USER'), updateNftHandler)
router.delete('/:id', isAuthenticated, hasRole('ADMIN'), deleteNftHandler);
export default router