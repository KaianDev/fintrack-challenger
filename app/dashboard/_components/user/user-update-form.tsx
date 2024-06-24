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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Utilities
import { toast } from "@/hooks"
import { updateUserSchema, UpdateUserFormData } from "@/schemas/user"
import { updateUser } from "../../_actions/user"

interface UserUpdateFormProps {
  onClose: () => void
  data: {
    first_name: string
    last_name: string
  }
}

export const UserUpdateForm = ({ data, onClose }: UserUpdateFormProps) => {
  const [isPending, startTransaction] = useTransition()
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: data,
  })

  const handleSubmit = form.handleSubmit((data) => {
    startTransaction(async () => {
      const res = await updateUser(data)
      onClose()
      if (res?.message) {
        toast("Erro", res.message)
      } else {
        toast("Dados atualizados com sucesso!")
      }
    })
  })

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" placeholder="Seu nome" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Seu sobrenome"
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
