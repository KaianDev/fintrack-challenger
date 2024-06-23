"use server"

import type { Balance } from "../../types"
import { getUserBalance as getUserBalanceService } from "@/services/user"

export const getUserBalance = async (id: string): Promise<Balance> => {
  try {
    const { balance, earnings, expenses, investments } =
      await getUserBalanceService(id)
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
