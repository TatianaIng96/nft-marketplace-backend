"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftImagesSeeder = void 0;
const fakeData_1 = require("../../../prisma/fakeData");
exports.nftImagesSeeder = fakeData_1.NftLinksForSeeders.map((url, index) => {
    return {
        id: `clllb0w400000p8qqqwereavw0${index + 1}`,
        url,
    };
});
