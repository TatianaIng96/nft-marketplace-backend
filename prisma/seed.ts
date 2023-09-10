import { PrismaClient } from "@prisma/client";
import { categorySeeder } from "../src/api/category/category.seeder";
import { collectionSeeder } from "../src/api/collection/collection.seeder";
import { userSeeder } from "../src/api/user/user.seeder";
import { nftImagesSeeder } from "../src/api/nft-image/nft-image.seeder";
import { nftsSeeder } from "../src/api/nft/nft.seeder";
import { imagesForNftsSeeder } from "../src/api/imageForNft/imageForNft.seeder";
import { nftOwnerSeeder } from "../src/api/nftOwner/nftOwner.seeder";

const prisma = new PrismaClient();

const main = async () => {
    const createCategories = await prisma.category.createMany({
        data: categorySeeder,
        skipDuplicates: true,
    });

    const createCollections = await prisma.collection.createMany({
        data: collectionSeeder,
        skipDuplicates: true,
    });

    const createUsers = await prisma.user.createMany({
        data: userSeeder,
        skipDuplicates: true,
    });

    const createNftImages = await prisma.nftImage.createMany({
        data: nftImagesSeeder,
        skipDuplicates: true,
    });

    const createNfts = await prisma.nft.createMany({
        data: nftsSeeder,
        skipDuplicates: true,
    });

    const createImagesForNft = await prisma.imageForNft.createMany({
        data: imagesForNftsSeeder,
        skipDuplicates: true,
    });

    const createNftOwners = await prisma.nftOwner.createMany({
        data: nftOwnerSeeder,
        skipDuplicates: true,
    });
}

main()
    .then(() => {
        console.log('SEEDING COMPLETE');
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })