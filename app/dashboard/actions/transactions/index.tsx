"use server"

import { Transaction } from "../../types"

export const getTransactions = async () => {
  const id = "fab4537e-fd5a-4bca-be99-ffe64eb74ee5"

  try {
    const res = await fetch(`${process.env.BASE_API}/transactions?userId=${id}`)
    const data = (await res.json()) as Transaction[]

    return data
  } catch (error) {
    console.log(error)
    throw new Error("Erro ao carregar os dados")
  }
}
