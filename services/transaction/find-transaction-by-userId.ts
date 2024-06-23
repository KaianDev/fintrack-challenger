import prisma from "@/lib/db"

export const findTransactionByUserId = async (userId: string) => {
  return await prisma.transaction.findMany({ where: { userId } })
}
