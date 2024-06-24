import prisma from "@/lib/db"

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}
