import prisma from "@/lib/db"

export const findTransactionByUserId = async (
  userId: string,
  startDate: Date,
  endDate: Date,
) => {
  return await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  })
}
