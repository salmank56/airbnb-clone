import { User } from "@prisma/client";

export type safaUser = Omit<
    User,
    "createdAt" | "updatedAt" | 'emailVerified'
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}