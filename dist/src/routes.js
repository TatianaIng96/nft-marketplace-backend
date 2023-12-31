"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const healthcheck_1 = __importDefault(require("./api/healthcheck"));
const nft_1 = __importDefault(require("./api/nft"));
const user_1 = __importDefault(require("./api/user"));
const transaction_1 = __importDefault(require("./api/transaction"));
const local_1 = __importDefault(require("./auth/local"));
const like_1 = __importDefault(require("./api/like"));
const auction_1 = __importDefault(require("./api/auction"));
const category_1 = __importDefault(require("./api/category"));
const nftOwner_1 = __importDefault(require("./api/nftOwner"));
const collection_1 = __importDefault(require("./api/collection"));
const bid_1 = __importDefault(require("./api/bid"));
const nft_image_1 = __importDefault(require("./api/nft-image"));
const profileImage_1 = __importDefault(require("./api/profileImage"));
const coverImage_1 = __importDefault(require("./api/coverImage"));
const routes = (app) => {
    app.use('/api/healthcheck', healthcheck_1.default);
    app.use('/api/nft', nft_1.default);
    app.use('/api/users', user_1.default);
    app.use('/api/transactions', transaction_1.default);
    app.use('/api/auctions', auction_1.default);
    app.use('/api/categories', category_1.default);
    app.use('/api/nft-owners', nftOwner_1.default);
    app.use('/api/collections', collection_1.default);
    app.use('/api/cover-image', coverImage_1.default);
    app.use('/api/like', like_1.default);
    app.use('/api/auctions', auction_1.default);
    app.use('/api/bid', bid_1.default);
    app.use('/auth/local', local_1.default);
    app.use('/api/nft-image', nft_image_1.default);
    app.use('/api/profile-image', profileImage_1.default);
};
exports.default = routes;
