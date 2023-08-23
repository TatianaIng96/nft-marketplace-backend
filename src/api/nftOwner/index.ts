import { Router } from "express";

import {
  getAllNftOwnersHandler,
  getNftOwnerByIdHandler,
  createNftOwnerHandler,
  updateNftOwnerHandler
} from "./nft_owner.controller";

import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router()

router.get('/', isAuthenticated, hasRole('ADMIN'), getAllNftOwnersHandler);

router.get('/:id', getNftOwnerByIdHandler);
router.post('/:id', isAuthenticated, createNftOwnerHandler);
router.put('/:id', isAuthenticated, updateNftOwnerHandler);

export default router;
