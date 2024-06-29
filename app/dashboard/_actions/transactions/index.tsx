"use server"

import { revalidatePath } from "next/cache"
import { TransactionFormData } from "../../_schemas"

import {
  findTransactionByUserId,
  createTransaction as createTransactionService,
  updateTransaction as updateTransactionService,
  deleteTransaction as deleteTransactionService,
} from "@/services/transaction"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getDate } from "@/helpers"

interface GetTransactionsParams {
  selectedMonth?: string
  selectedYear?: string
}

export const getTransactions = async ({
  selectedMonth,
  selectedYear,
}: GetTransactionsParams) => {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    redirect("/")
  }

  try {
    const { startDate, endDate } = getDate({ selectedMonth, selectedYear })

    const transactions = await findTransactionByUserId(
      userId,
      startDate,
      endDate,
    )

    return transactions.map((t) => {
      return {
        ...t,
        amount: t.amount.toNumber(),
        category: t.category ?? undefined,
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
      message: "Ocorreu um erro durante a adição da nova transação",
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
      message: "Ocorreu um erro durante a edição da transação",
    }
  }
}

export const deleteTransaction = async (id: string) => {
  await deleteTransactionService(id)
  revalidatePath("/dashboard")
}
