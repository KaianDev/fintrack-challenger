"use server"

import { revalidatePath } from "next/cache"
import { TransactionFormData } from "../../schemas"

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