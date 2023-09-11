"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreateBidHandler = exports.getAllBidHandler = void 0;
const bid_service_1 = require("./bid.service");
const getAllBidHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { autionId } = req.params;
    const bid = yield (0, bid_service_1.getAllBid)(parseInt(autionId));
    return res.status(200).json(bid);
});
exports.getAllBidHandler = getAllBidHandler;
const getCreateBidHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    try {
        const bid = yield (0, bid_service_1.createBid)(data);
        res.json(bid);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo crear la oferta al nft.' });
    }
});
exports.getCreateBidHandler = getCreateBidHandler;
