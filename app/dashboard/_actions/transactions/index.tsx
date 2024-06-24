"use server"

import { revalidatePath } from "next/cache"
import { TransactionFormData } from "../../schemas"

import {
  findTransactionByUserId,
  createTransaction as createTransactionService,
  updateTransaction as updateTransactionService,
  deleteTransaction as deleteTransactionService,
} from "@/services/transaction"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export const getTransactions = async () => {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    redirect("/")
  }

  try {
    const transactions = await findTransactionByUserId(userId)
    return transactions.map((t) => {
      return {
        ...t,
        amount: t.amount.toNumber(),
      }
    })
  } catch (error) {
    throw new Error("Erro ao carregar os dados")
  }
}

export const createTransaction = async (data: TransactionFormData) => {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      redirect("/")
    }
    const createData = { ...data, userId }
    await createTransactionService(createData)

    revalidatePath("/dashboard")
  } catch (error) {
    return {
      message:"Ocorreu um erro durante a adição da nova transação"
    }
  }
}

export const updateTransaction = async (
  transactionId: string,
  data: TransactionFormData,
) => {
  try {
    await updateTransactionService(transactionId, data)
    revalidatePath("/dashboard")
  } catch (error) {
    return {
      message:"Ocorreu um erro durante a edição da transação"
    }
  }
}

export const deleteTransaction = async (id: string) => {
  await deleteTransactionService(id)
  revalidatePath("/dashboard")
}
