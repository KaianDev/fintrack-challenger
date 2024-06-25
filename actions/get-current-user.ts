"use server"

import { auth } from "@/lib/auth"
import { User } from "@/schemas/user"
import { redirect } from "next/navigation"

export const getCurrentUser = async () => {
  try {
    const session = await auth()
    if (!session?.user) redirect("/")

    const userId = session?.user?.id!
    const res = await fetch(`${process.env.BASE_API}/users/${userId}`)
    if (!res.ok) {
      throw new Error("Erro ao carregar dados do usuário")
    }
    const user = (await res.json()) as User
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }
  } catch (error) {
    throw new Error("Erro ao carregar dados do usuário")
  }
}