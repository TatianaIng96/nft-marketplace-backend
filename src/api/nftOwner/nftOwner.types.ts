import { NftOwner as NftOwnerModel } from ".prisma/client";

export type NftOwner = NftOwnerModel

export type NftOwnerRelation = Pick<NftOwner, 'userId' | 'nftId'>