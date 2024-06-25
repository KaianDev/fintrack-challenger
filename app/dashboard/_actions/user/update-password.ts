"use server"

import { auth } from "@/lib/auth"
import { PasswordFormData } from "../../schemas"
import { redirect } from "next/navigation"

export const updatePassword = async (data: PasswordFormData) => {
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
      body: JSON.stringify({
        password: data.newPassword,
      }),
    })
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return { message: "Ocorreu um erro ao tentar alterar a senha" }
  }
}