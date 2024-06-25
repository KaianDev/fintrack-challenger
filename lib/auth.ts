import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { z } from "zod"

import prisma from "./db"
import { User } from "@/schemas/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const schema = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials)

        if (!schema.success) return null
        const { email, password } = schema.data

        const res = await fetch(`${process.env.BASE_API}/users/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
          throw new CredentialsSignin("E-mail e/ou senha inválidos")
        }

        const user = (await res.json()) as User

        return {
          email: user.email,
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id
      }
      return token
    },

    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.sub!
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3, // 3 hours
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
})
