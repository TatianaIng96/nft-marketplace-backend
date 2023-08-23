import { User as UserModel } from "@prisma/client"

export interface UserWithCoverImage extends UserModel {
    coverImage?: string
}