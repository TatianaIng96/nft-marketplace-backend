import { Router } from "express";

import {
    getAllNftHandler,
    getNftHandler,
    createNftHandler,
    updateNftHandler,
    deleteNftHandler,
    getNftUserHandler,
} from "./nft.controller";
import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router()

router.get('/', getAllNftHandler)
router.get('/:id', getNftHandler)
router.get('/user/:id', getNftUserHandler)
router.post('/', isAuthenticated, hasRole('USER'), createNftHandler)
router.put('/:id', isAuthenticated, hasRole('USER'), updateNftHandler)
router.delete('/:id', isAuthenticated, hasRole('ADMIN'), deleteNftHandler);
export default router