"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import bcryptjs from "bcryptjs"

import type { Balance } from "../../types"
import {
  getUserBalance as getUserBalanceService,
  updateUser as updateUserService,
  UpdateUserData,
  findUserById,
} from "@/services/user"
import { PasswordFormData } from "../../schemas"
import { auth } from "@/lib/auth"
import { User } from "@/schemas/user"

interface BalanceDataBackendResponse {
  expenses: string
  earnings: string
  balance: string
  investments: string
}

export const getUserBalance = async (): Promise<Balance> => {
  try {
    // const session = await auth()
    // const userId = session?.user?.id
    // if (!userId) {
    //   redirect("/")
    // }
    const userId = "2054d081-d5b6-404a-bea0-cc43ef777c98"
    const res = await fetch(`${process.env.BASE_API}/users/${userId}/balance`)
    if (!res.ok) {
      throw new Error("Erro ao carregar balanço")
    }
    const { balance, earnings, expenses, investments } =
      (await res.json()) as BalanceDataBackendResponse

    return {
      balance: Number(balance),
      expenses: Number(expenses),
      earnings: Number(earnings),
      investments: Number(investments),
    }
  } catch (error) {
    throw new Error("Erro ao carregar dados")
  }
}

export const updateUser = async (data: UpdateUserData) => {
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
