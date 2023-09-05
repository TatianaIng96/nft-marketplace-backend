import { Router } from "express";

import {
    loginHandler,
    activateAccountHandler
} from "./local.controller"

const router = Router();

router.post('/login', loginHandler);
router.get('/activate-account/:token', activateAccountHandler);

export default router;