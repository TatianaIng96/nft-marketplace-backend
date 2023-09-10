import { nftsSeeder } from "../nft/nft.seeder";

export const nftOwnerSeeder = nftsSeeder.map((nft) => {
    return {
        nftId: nft.id,
        userId: nft.userId,
    }
});