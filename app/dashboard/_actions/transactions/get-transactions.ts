"use server"

import { TransactionData, TransactionType } from "../../types"

interface TransactionDataBackendResponse {
  id: string
  user_id: string
  name: string
  date: Date
  amount: string
  type: TransactionType
}

export const getTransactions = async (): Promise<TransactionData[]> => {
  // const session = await auth()
  // const userId = session?.user?.id
  // if (!userId) {
  //   redirect("/")
  // }
  const userId = "2054d081-d5b6-404a-bea0-cc43ef777c98"

  try {
    const res = await fetch(
      `${process.env.BASE_API}/transactions?userId=${userId}`,
    )
    if (!res.ok) {
      throw new Error("Erro ao carregar transações")
    }
    const transactions = (await res.json()) as TransactionDataBackendResponse[]
    return transactions.map((t) => {
      return {
        ...t,
        userId: t.user_id,
        date: new Date(t.date),
        amount: Number(t.amount),
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Ocorreu um erro de servidor")
  }
}
