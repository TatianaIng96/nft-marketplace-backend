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
exports.createAuctionHandler = exports.getSingleAuctionNftHandler = exports.getSingleAuctionHandler = exports.getAllAuctionsHandler = void 0;
const auction_service_1 = require("./auction.service");
const getAllAuctionsHandler = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auctions = yield (0, auction_service_1.getAllAuctions)();
    return res.status(200).json(auctions);
});
exports.getAllAuctionsHandler = getAllAuctionsHandler;
const getSingleAuctionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const auction = yield (0, auction_service_1.getSingleAuction)(parseInt(id));
    res.status(201).json(auction);
});
exports.getSingleAuctionHandler = getSingleAuctionHandler;
const getSingleAuctionNftHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const auction = yield (0, auction_service_1.getAllAuctionsNft)(id);
    res.status(201).json(auction);
});
exports.getSingleAuctionNftHandler = getSingleAuctionNftHandler;
const createAuctionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const auction = yield (0, auction_service_1.createAuction)(body);
    return res.status(201).json(auction);
});
exports.createAuctionHandler = createAuctionHandler;
/* export const updateAuctionHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { body } = req;

    const updatedAuction = await updateAuction(parseInt(id), body);

    return res.status(201).json(updatedAuction);
}

export const deleteAuctionHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedAuction = await deleteAuction(parseInt(id));

    return deletedAuction;
} */
