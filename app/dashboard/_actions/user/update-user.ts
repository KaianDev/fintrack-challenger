"use server"

import { auth } from "@/lib/auth"
import { UpdateUserFormData } from "@/schemas/user"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const updateUser = async (data: UpdateUserFormData) => {
  try {
    const session = await auth()
    if (!session?.user) {
      redirect("/")
    }
    const userId = session?.user?.id!

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
