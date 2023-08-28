import { NftImage as NftImageModel } from "@prisma/client";

export type NftImage = NftImageModel;

export interface NftImageWithName extends NftImage {
    name?: string
}