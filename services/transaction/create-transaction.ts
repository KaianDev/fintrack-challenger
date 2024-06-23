import prisma from "@/lib/db"
import { Prisma } from "@prisma/client"

export type CreateTransactionData = Prisma.Args<
  typeof prisma.transaction,
  "create"
>["data"]

export const createTransaction = async (data: CreateTransactionData) => {
  return await prisma.transaction.create({ data })
}
