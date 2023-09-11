"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../auth/auth.controller");
const auction_controller_1 = require("./auction.controller");
const router = (0, express_1.Router)();
router.get('/', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)('ADMIN'), auction_controller_1.getAllAuctionsHandler);
router.get('/:id', auth_controller_1.isAuthenticated, auction_controller_1.getSingleAuctionHandler); // lo puede hacer admin y el usuario que la montó
router.get('/nft/:id', auth_controller_1.isAuthenticated, auction_controller_1.getSingleAuctionNftHandler); // lo puede hacer admin y el usuario que la montó
router.post('/', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)('USER'), auction_controller_1.createAuctionHandler); // solamente el dueño del nft
// una subasta no se cambia ni se elimina, solo se termina! Hay que hacer modales para advertir
// eso antes de crear una subasta (o hacer una oferta)
exports.default = router;
