import prisma from "@/lib/db"
import { Prisma } from "@prisma/client"

export type UpdateTransactionData = Prisma.Args<
  typeof prisma.transaction,
  "update"
>["data"]

export const updateTransaction = async (
  id: string,
  data: UpdateTransactionData,
) => {
  return await prisma.transaction.update({ where: { id }, data })
}
