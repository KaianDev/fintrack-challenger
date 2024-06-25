import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { z } from "zod"
import bcryptjs from "bcryptjs"

import { findUserByEmail } from "@/services/user"
import prisma from "./db"

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

        const foundUser = await findUserByEmail(email)
        if (!foundUser)
          throw new CredentialsSignin("E-mail e/ou senha inválidos")

        const matchPassword = await bcryptjs.compare(
          password,
          foundUser.password,
        )

        if (!matchPassword)
          throw new CredentialsSignin("E-mail e/ou senha inválidos")

        return {
          email: foundUser.email,
          id: foundUser.id,
          name: `${foundUser.first_name} ${foundUser.last_name}`,
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
