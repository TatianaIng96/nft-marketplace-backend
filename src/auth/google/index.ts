import { Router } from "express";

import { handleGoogleRegister, handleGoogleLogin } from "./google.controller";

const router = Router()

router.post('/', handleGoogleRegister);
router.post('/login', handleGoogleLogin);

export default router;