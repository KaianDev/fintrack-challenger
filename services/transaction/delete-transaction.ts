import prisma from "@/lib/db"

export const deleteTransaction = async (id: string) => {
  return await prisma.transaction.delete({ where: { id } })
}
