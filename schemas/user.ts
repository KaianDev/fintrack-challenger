import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  first_name: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(1, "Campo obrigatório")
    .max(15, "O número máximo de caracteres é 15")
    .trim(),
  last_name: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(1, "Campo obrigatório")
    .max(15, "O número máximo de caracteres é 15")
    .trim(),
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email("E-mail inválido")
    .toLowerCase()
    .trim(),
  password: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(1, "Campo obrigatório")
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .trim(),
})

export const authSchema = userSchema.omit({
  id: true,
  first_name: true,
  last_name: true,
})

export const createUserSchema = userSchema.omit({
  id: true,
})

export const updateUserSchema = userSchema.omit({
  id: true,
  password: true,
  email: true,
})

export type User = z.infer<typeof userSchema>
export type AuthFormData = z.infer<typeof authSchema>
export type CreateUserFormData = z.infer<typeof createUserSchema>
export type UpdateUserFormData = z.infer<typeof updateUserSchema>
