import { z } from "zod"

export const passwordSchema = z.object({
  password: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(1, "Campo obrigatório")
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .trim(),
  newPassword: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(1, "Campo obrigatório")
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .trim(),
})

export type PasswordFormData = z.infer<typeof passwordSchema>