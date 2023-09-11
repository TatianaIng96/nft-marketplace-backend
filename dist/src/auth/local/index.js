"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const local_controller_1 = require("./local.controller");
const router = (0, express_1.Router)();
router.post('/login', local_controller_1.loginHandler);
router.get('/activate-account/:token', local_controller_1.activateAccountHandler);
exports.default = router;
