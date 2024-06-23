"use server"

import { Balance } from "../../types"

export const getUserBalance = async (id: string): Promise<Balance> => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users/${id}/balance`)
    const data = (await res.json()) as Balance
    return {
      earnings: Number(data.earnings || 0),
      balance: Number(data.balance || 0),
      expenses: Number(data.expenses || 0),
      investments: Number(data.investments || 0),
    }
  } catch (error) {
    throw new Error("Erro ao carregar dados")
  }
}
