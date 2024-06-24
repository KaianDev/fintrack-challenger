"use server"

import { redirect } from "next/navigation"
import type { Balance } from "../../types"
import { getUserBalance as getUserBalanceService } from "@/services/user"
import { auth } from "@/lib/auth"

export const getUserBalance = async (): Promise<Balance> => {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      redirect("/")
    }

    const { balance, earnings, expenses, investments } =
      await getUserBalanceService(userId)
    return {
      earnings: earnings.toNumber(),
      balance: balance.toNumber(),
      expenses: expenses.toNumber(),
      investments: investments.toNumber(),
    }
  } catch (error) {
    throw new Error("Erro ao carregar dados")
  }
}
