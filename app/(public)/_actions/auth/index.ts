"use server"

import { auth, signIn } from "@/lib/auth"

import { AuthError } from "next-auth"
import {
  CreateUserData,
  createUser,
  findUserByEmail,
  findUserByIdWithOutPassword,
} from "@/services/user"
import bcryptjs from "bcryptjs"

import { AuthFormData } from "@/schemas/user"

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

export const signUp = async (data: CreateUserData) => {
  try {
    const foundUser = await findUserByEmail(data.email)

    if (foundUser) {
      throw new Error("E-mail já utilizado")
    }

    const hashPassword = await bcryptjs.hash(data.password, 10)

    await createUser({
      ...data,
      password: hashPassword,
    })
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return { message: "Ocorreu um erro de servidor" }
  }
}

export const getCurrentUser = async () => {
  try {
    const session = await auth()
    return await findUserByIdWithOutPassword(session?.user?.id!)
  } catch (error) {
    throw new Error("Erro ao carregar dados do usuário")
  }
}
