import prisma from "@/lib/db"

export const findUserById = async (id: string) => {
  return await prisma.user.findFirst({ where: { id } })
}

export const findUserByIdWithOutPassword = async (id: string) => {
  return await prisma.user.findFirst({
    where: { id },
    select: {
      email: true,
      first_name: true,
      last_name: true,
    },
  })
}
