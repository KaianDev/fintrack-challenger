"use server"

import { CreateUserFormData } from "@/schemas/user"

export const signUp = async (data: CreateUserFormData) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const user = await res.json()
    if (user.message) {
      throw new Error(user.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return { message: "Ocorreu um erro de servidor" }
  }
}