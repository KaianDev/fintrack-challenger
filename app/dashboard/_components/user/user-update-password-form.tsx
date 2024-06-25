"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { Loader } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"

// Utilities
import { toast } from "@/hooks"
import { updatePassword } from "../../_actions/user"
import { PasswordFormData, passwordSchema } from "../../schemas"

interface UserUpdatePasswordFormPros {
  onClose: () => void
}

export const UserUpdatePasswordForm = ({
  onClose,
}: UserUpdatePasswordFormPros) => {
  const [isPending, startTransaction] = useTransition()
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const handleSubmit = form.handleSubmit((data) => {
    startTransaction(async () => {
      const res = await updatePassword(data)
      if (res?.message) {
        toast("Erro", res.message)
      } else {
        onClose()
        toast("Senha altera com sucesso!")
      }
    })
  })

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  autoComplete="off"
                  placeholder="Sua senha"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  autoComplete="off"
                  placeholder="Sua nova senha"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="mr-1 size-4 animate-spin" />
                Carregando..
              </>
            ) : (
              "Salvar"
            )}
          </Button>
          <Button
            onClick={onClose}
            type="button"
            variant="cancel"
            disabled={isPending}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  )
}
