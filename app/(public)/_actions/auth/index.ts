"use server"

import {  signIn } from "@/lib/auth"

import { AuthError } from "next-auth"
import bcryptjs from "bcryptjs"

import { AuthFormData, CreateUserFormData } from "@/schemas/user"

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

export const signUp = async (data: CreateUserFormData) => {
  try {
    const hashPassword = await bcryptjs.hash(data.password, 10)
    const res = await fetch(`${process.env.BASE_API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        password: hashPassword,
      }),
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

