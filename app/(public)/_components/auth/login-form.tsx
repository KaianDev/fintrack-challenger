"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { Loader } from "lucide-react"

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
import { PasswordInput } from "@/components/ui/password-input"

// Utilities
import { AuthFormData, authSchema } from "@/schemas/user"
import { login } from "../../_actions/auth"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks"

export const LoginForm = () => {
  const router = useRouter()
  const [isPending, startTransaction] = useTransition()
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const handleLogin = form.handleSubmit((data) => {
    startTransaction(async () => {
      const res = await login(data)
      if (res?.message) {
        toast("Erro", res.message)
      } else {
        router.replace("/dashboard")
      }
    })
  })

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleLogin} className="space-y-6">
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
                    disabled={isPending}
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
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="mr-1 size-4 animate-spin" />
                Carregando..
              </>
            ) : (
              "Login"
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
