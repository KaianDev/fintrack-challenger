"use server"

import { revalidatePath } from "next/cache"
import { TransactionFormData } from "../../schemas"

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
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

export const createTransaction = async (data: TransactionFormData) => {
  try {
    // const session = await auth()
    // const userId = session?.user?.id

    // if (!userId) {
    //   redirect("/")
    // }
    const user_id = "2054d081-d5b6-404a-bea0-cc43ef777c98"
    const createData = { ...data, user_id }
    const res = await fetch(`${process.env.BASE_API}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createData),
    })

    if (!res.ok) {
      throw new Error("Erro ao criar transação")
    }
    // await createTransactionService(createData)

    revalidatePath("/dashboard")
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return {
      message: "Ocorreu um erro de servidor",
    }
  }
}

export const updateTransaction = async (
  transactionId: string,
  data: TransactionFormData,
) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/transactions/${transactionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )
    revalidatePath("/dashboard")
    if (!res.ok) {
      throw new Error("Erro ao editar transação")
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return {
      message: "Ocorreu um erro durante a edição da transação",
    }
  }
}

export const deleteTransaction = async (transactionId: string) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/transactions/${transactionId}`,
      {
        method: "DELETE",
      },
    )

    if (!res.ok) {
      throw new Error("Erro ao excluir transação")
    }

    revalidatePath("/dashboard")
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return {
      message: "Ocorreu um erro ao tentar excluir transação",
    }
  }
}
