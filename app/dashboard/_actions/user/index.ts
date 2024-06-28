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
import { PasswordFormData } from "../../_schemas"
import { auth } from "@/lib/auth"

export const getUserBalance = async (): Promise<Balance> => {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      redirect("/")
    }

    const { balance, earnings, expenses, investments } =
      await getUserBalanceService(userId)
    return {
      earnings: earnings.toNumber(),
      balance: balance.toNumber(),
      expenses: expenses.toNumber(),
      investments: investments.toNumber(),
    }
  } catch (error) {
    throw new Error("Erro ao carregar dados")
  }
}

export const updateUser = async (data: UpdateUserData) => {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      redirect("/")
    }

    await updateUserService(userId, data)
  } catch (error) {
    return { message: "Erro ao alterar dados" }
  }

  revalidatePath("/dashboard")
}

export const updatePassword = async (data: PasswordFormData) => {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      redirect("/")
    }

    const foundUser = await findUserById(userId)

    if (!foundUser) throw new Error("Usuário não encontrado")

    const matchPassword = await bcryptjs.compare(
      data.password,
      foundUser.password,
    )

    if (!matchPassword) throw new Error("A senha informada está incorreta")

    const hashPassword = await bcryptjs.hash(data.newPassword, 10)
    await updateUserService(userId, {
      password: hashPassword,
    })
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return { message: "Ocorreu um erro ao tentar alterar a senha" }
  }
}
