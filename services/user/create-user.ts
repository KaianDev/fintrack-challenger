import prisma from "@/lib/db"
import { Prisma } from "@prisma/client"

export type CreateUserData = Prisma.Args<typeof prisma.user, "create">["data"]

export const createUser = async (data: CreateUserData) => {
  return await prisma.user.create({ data })
}
