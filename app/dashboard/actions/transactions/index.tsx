"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { TransactionFormData } from "../../schemas"
import { Transaction } from "../../types"

export const getTransactions = async () => {
  const userId = "fab4537e-fd5a-4bca-be99-ffe64eb74ee5"

  try {
    const res = await fetch(
      `${process.env.BASE_API}/transactions?userId=${userId}`,
      { next: { tags: ["transactions"] } },
    )
    const data = (await res.json()) as Transaction[]
    return data
  } catch (error) {
    throw new Error("Erro ao carregar os dados")
  }
}

export const createTransaction = async (data: TransactionFormData) => {
  const userId = "fab4537e-fd5a-4bca-be99-ffe64eb74ee5"
  const body = { ...data, user_id: userId, amount: Number(data.amount) }
  const res = await fetch(`${process.env.BASE_API}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: {
      tags: ["transactions"],
    },
  })

  const dataJson = await res.json()

  if (res.status >= 400) {
    return {
      message: dataJson.message || "Error de servidor",
    }
  }

  revalidateTag("transaction")
  revalidatePath("/dashboard")
}
