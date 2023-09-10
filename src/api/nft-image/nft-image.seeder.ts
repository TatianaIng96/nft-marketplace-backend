import { NftLinksForSeeders } from "../../../prisma/fakeData";

export const nftImagesSeeder = NftLinksForSeeders.map((url, index) => {
    return {
        id: `clllb0w400000p8qqqwereavw0${index + 1}`,
        url,
    }
})