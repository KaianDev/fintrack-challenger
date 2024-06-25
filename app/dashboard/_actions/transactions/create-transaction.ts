"use server"

import { revalidatePath } from "next/cache"
import { TransactionFormData } from "../../schemas"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export const createTransaction = async (data: TransactionFormData) => {
  try {
    const session = await auth()
    if (!session?.user) {
      redirect("/")
    }
    const user_id = session?.user?.id!

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
