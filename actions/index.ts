"use server"
import { signOut } from "@/lib/auth"
import { User } from "@/schemas/user"


export const logout = async () => {
  await signOut({
    redirect: true,
    redirectTo: "/",
  })
}

export const getCurrentUser = async () => {
  try {
    // const session = await auth()
    // return await findUserByIdWithOutPassword(session?.user?.id!)
    const userId = "2054d081-d5b6-404a-bea0-cc43ef777c98"
    const res = await fetch(`${process.env.BASE_API}/users/${userId}`)
    if (!res.ok) {
      throw new Error("Erro ao carregar dados do usuário")
    }
    const user = (await res.json()) as User
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  } catch (error) {
    throw new Error("Erro ao carregar dados do usuário")
  }
}