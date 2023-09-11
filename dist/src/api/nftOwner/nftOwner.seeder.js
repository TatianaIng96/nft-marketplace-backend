"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftOwnerSeeder = void 0;
const nft_seeder_1 = require("../nft/nft.seeder");
exports.nftOwnerSeeder = nft_seeder_1.nftsSeeder.map((nft) => {
    return {
        nftId: nft.id,
        userId: nft.userId,
    };
});
