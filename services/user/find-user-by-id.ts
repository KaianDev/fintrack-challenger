import prisma from "@/lib/db"

export const findUserById = async (id: string) => {
  return await prisma.user.findFirst({ where: { id } })
}
