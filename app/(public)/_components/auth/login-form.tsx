"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { Loader } from "lucide-react"
import { signIn } from "next-auth/react"

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
import { AuthFormData, authSchema } from "../../schemas"
import { login } from "../../_actions/auth"
import { useRouter } from "next/navigation"

export const LoginForm = () => {
  const router = useRouter()
  const [isPending, startTransaction] = useTransition()
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const handleLogin = form.handleSubmit((data) => {
    startTransaction(async () => {
      const { email, password } = data
      const res = await login(data)
      if (res?.message) {
        // TODO: sonner
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
