"use server"

import { redirect } from "next/navigation"
import { Balance } from "../../types"
import { auth } from "@/lib/auth"

interface BalanceDataBackendResponse {
  expenses: string
  earnings: string
  balance: string
  investments: string
}

export const getUserBalance = async (): Promise<Balance> => {
  try {
    const session = await auth()
    if (!session?.user) {
      redirect("/")
    }
    const userId = session?.user?.id!
    const res = await fetch(`${process.env.BASE_API}/users/${userId}/balance`)
    if (!res.ok) {
      throw new Error("Erro ao carregar balanço")
    }
    const { balance, earnings, expenses, investments } =
      (await res.json()) as BalanceDataBackendResponse

    return {
      balance: Number(balance),
      expenses: Number(expenses),
      earnings: Number(earnings),
      investments: Number(investments),
    }
  } catch (error) {
    throw new Error("Erro ao carregar dados")
  }
}