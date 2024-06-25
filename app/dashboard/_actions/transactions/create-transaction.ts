"use server"

import { revalidatePath } from "next/cache"
import { TransactionFormData } from "../../schemas"

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