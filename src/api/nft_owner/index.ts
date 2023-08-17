import { Router } from "express";

import {
  getAllNftOwnersHandler,
  getNftOwnerByIdHandler,
  createNftOwnerHandler
} from "./nft_owner.controller";

import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router()

router.get('/', isAuthenticated, hasRole('ADMIN'), getAllNftOwnersHandler);

router.get('/:id', getNftOwnerByIdHandler);
router.post('/:id', isAuthenticated, createNftOwnerHandler);

export default router;
