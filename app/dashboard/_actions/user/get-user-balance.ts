"use server"

import { Balance } from "../../types"

interface BalanceDataBackendResponse {
  expenses: string
  earnings: string
  balance: string
  investments: string
}

export const getUserBalance = async (): Promise<Balance> => {
  try {
    // const session = await auth()
    // const userId = session?.user?.id
    // if (!userId) {
    //   redirect("/")
    // }
    const userId = "2054d081-d5b6-404a-bea0-cc43ef777c98"
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