"use server"

import { signIn } from "@/lib/auth"
import { AuthFormData } from "@/schemas/user"
import { AuthError } from "next-auth"

export const login = async (data: AuthFormData) => {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: error.cause?.err?.message }
    }

    return { message: "Erro de servidor" }
  }
}