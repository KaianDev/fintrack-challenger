"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Utilities
import { CreateUserFormData, createUserSchema } from "@/schemas/user"
import { signUp } from "../../_actions/auth"

export const SignUpForm = () => {
  const router = useRouter()
  const [isPending, startTransaction] = useTransition()
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  })

  const handleSignUp = form.handleSubmit((data) => {
    startTransaction(async () => {
      const res = await signUp(data)
      if (res?.message) {
      } else {
        router.replace("/")
      }
    })
  })

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSignUp} className="space-y-6">
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="Seu e-mail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="off"
                    placeholder="Sua senha"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="mr-1 size-4 animate-spin" />
                Carregando..
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </form>
      </Form>
    </div>
  )
}
