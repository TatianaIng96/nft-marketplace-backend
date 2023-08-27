import { Router } from "express";

import {
  getAllNftOwnersHandler,
  getNftOwnerByIdHandler,
  createNftOwnerHandler,
  updateNftOwnerHandler
} from "./nftOwner.controller";

import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router()

router.get('/', isAuthenticated, hasRole('ADMIN'), getAllNftOwnersHandler);
router.post('/', isAuthenticated, createNftOwnerHandler);

router.get('/:id', getNftOwnerByIdHandler);
router.put('/:id', isAuthenticated, updateNftOwnerHandler);

export default router;
