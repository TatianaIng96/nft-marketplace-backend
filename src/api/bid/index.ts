import { Router } from "express";
import { getAllBidHandler, getCreateBidHandler } from "./bid.controller";
import { isAuthenticated } from "../../auth/auth.controller";
import { hasRole } from "../../auth/auth.controller";
const router = Router();

router.get('/:autionId',isAuthenticated, getAllBidHandler);
router.post('/',isAuthenticated,hasRole('USER'),getCreateBidHandler)

export default router;