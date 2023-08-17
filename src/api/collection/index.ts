import { Router } from "express";

import {
  getAllCollectionsHandler,
  getCollectionByIdHandler,
  updateCollectionHandler,
  createCollectionHandler,
  deleteCollectionHandler
} from "./collection.controller";
import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router()

router.get('/', getAllCollectionsHandler);
router.post('/', isAuthenticated, hasRole('ADMIN'), createCollectionHandler);

router.get('/:id', getCollectionByIdHandler);
router.put('/:id', isAuthenticated, hasRole('ADMIN'), updateCollectionHandler);
router.delete('/:id', isAuthenticated, hasRole('ADMIN'), deleteCollectionHandler);

export default router;
