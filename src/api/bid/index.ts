import { Router } from "express";
import { getAllBidHandler, getCreateBidHandler } from "./bid.controller";

const router = Router();

router.get('/:autionId', getAllBidHandler);
router.post('/',getCreateBidHandler)

export default router;