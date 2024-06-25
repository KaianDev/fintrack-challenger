"use server"

import { redirect } from "next/navigation"
import { TransactionData, TransactionType } from "../../types"
import { auth } from "@/lib/auth"

interface TransactionDataBackendResponse {
  id: string
  user_id: string
  name: string
  date: Date
  amount: string
  type: TransactionType
}

export const getTransactions = async (): Promise<TransactionData[]> => {
  const session = await auth()
  if (!session?.user) {
    redirect("/")
  }
  const userId = session?.user?.id!

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
