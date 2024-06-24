import prisma from "@/lib/db"
import { Prisma } from "@prisma/client"

export type UpdateUserData = Prisma.Args<typeof prisma.user, "update">["data"]

export const updateUser = async (userId: string, data: UpdateUserData) => {
  return await prisma.user.update({ where: { id: userId }, data })
}
