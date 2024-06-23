"use server"

import { revalidatePath } from "next/cache"
import { TransactionFormData } from "../../schemas"

import {
  findTransactionByUserId,
  createTransaction as createTransactionService,
  updateTransaction as updateTransactionService,
  deleteTransaction as deleteTransactionService,
} from "@/services/transaction"

export const getTransactions = async () => {
  const userId = "fab4537e-fd5a-4bca-be99-ffe64eb74ee5"
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
    const userId = "fab4537e-fd5a-4bca-be99-ffe64eb74ee5"
    const createData = { ...data, userId }
    await createTransactionService(createData)

    revalidatePath("/dashboard")
  } catch (error) {
    throw new Error("Erro ao criar transação")
  }
}

export const updateTransaction = async (
  transactionId: string,
  data: TransactionFormData,
) => {
  try {
    await updateTransactionService(transactionId, data)
    revalidatePath("/dashboard")
  } catch (error) {}
}

export const deleteTransaction = async (id: string) => {
  await deleteTransactionService(id)

  revalidatePath("/dashboard")
}
