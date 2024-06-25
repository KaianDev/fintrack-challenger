"use server"

import { revalidatePath } from "next/cache"

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