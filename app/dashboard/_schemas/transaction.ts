import { z } from "zod"
import { TransactionType } from "@prisma/client"

export const transactionFormSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório"),
  type: z.nativeEnum(TransactionType, { required_error: "Campo obrigatório" }),
  amount: z.coerce
    .number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Campo obrigatório",
    })
    .positive("O valor precisa ser maior que 0")
    .min(0.1, "O valor mínimo é 0.1"),
  date: z.date({
    required_error: "Campo obrigatório",
    invalid_type_error: "Campo obrigatório",
  }),
})

export type TransactionFormData = z.infer<typeof transactionFormSchema>
