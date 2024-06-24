import prisma from "@/lib/db"
import { Prisma, TransactionType } from "@prisma/client"

export const getUserBalance = async (id: string) => {
  const {
    _sum: { amount: totalExpenses },
  } = await prisma.transaction.aggregate({
    where: {
      userId: id,
      type: TransactionType.EXPENSE,
    },
    _sum: {
      amount: true,
    },
  })

  const {
    _sum: { amount: totalEarnings },
  } = await prisma.transaction.aggregate({
    where: {
      userId: id,
      type: TransactionType.EARNING,
    },
    _sum: {
      amount: true,
    },
  })

  const {
    _sum: { amount: totalInvestments },
  } = await prisma.transaction.aggregate({
    where: {
      userId: id,
      type: TransactionType.INVESTMENT,
    },
    _sum: {
      amount: true,
    },
  })

  const earnings = totalEarnings || new Prisma.Decimal(0)
  const expenses = totalExpenses || new Prisma.Decimal(0)
  const investments = totalInvestments || new Prisma.Decimal(0)

  const balance = new Prisma.Decimal(
    earnings.toNumber() - expenses.toNumber() - investments.toNumber(),
  )

  return {
    earnings,
    expenses,
    investments,
    balance,
  }
}
