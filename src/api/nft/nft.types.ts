import {Nft as NftModel} from '@prisma/client'
import { Category } from '../category/category.types';

export type Nft = NftModel;
export type Query = {
  likes:String,
  category: String,
  collection: String,
  price: String
}