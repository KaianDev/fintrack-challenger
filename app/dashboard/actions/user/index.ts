"use server"

import { Balance } from "../../types"

export const getUserBalance = async (id: string): Promise<Balance> => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users/${id}/balance`)
    const data = (await res.json()) as Balance
    return data
  } catch (error) {
    console.log(error)
    throw new Error("Erro ao carregar dados")
  }
}
