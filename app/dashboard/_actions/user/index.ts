"use server"

import { redirect } from "next/navigation"
import type { Balance } from "../../types"
import {
  getUserBalance as getUserBalanceService,
  updateUser as updateUserService,
  UpdateUserData,
} from "@/services/user"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

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
