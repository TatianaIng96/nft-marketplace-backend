import { Router } from "express";

import {
    getAllNftHandler,
    getNftHandler,
    createNftHandler,
    updateNftHandler,
    deleteNftHandler
} from "./nft.controller";

const router =  Router()

router.get('/',getAllNftHandler)
router.get('/:id',getNftHandler)
router.post('/',createNftHandler)
router.put('/:id',updateNftHandler)
router.delete('/:id', deleteNftHandler);
export default router