"use server"

import { UpdateUserFormData } from "@/schemas/user"
import { revalidatePath } from "next/cache"

export const updateUser = async (data: UpdateUserFormData) => {
  try {
    const userId = "2054d081-d5b6-404a-bea0-cc43ef777c98"

    const res = await fetch(`${process.env.BASE_API}/users/${userId}`)

    if (!res.ok) throw new Error("Usuário não encontrado")

    await fetch(`${process.env.BASE_API}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return { message: "Ocorreu um erro ao tentar alterar os dados" }
  }

  revalidatePath("/dashboard")
}
