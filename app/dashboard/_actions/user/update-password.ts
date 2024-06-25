"use server"

import { PasswordFormData } from "../../schemas"

export const updatePassword = async (data: PasswordFormData) => {
  try {
    // const session = await auth()
    // const userId = session?.user?.id
    // if (!userId) {
    //   redirect("/")
    // }
    const userId = "2054d081-d5b6-404a-bea0-cc43ef777c98"

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