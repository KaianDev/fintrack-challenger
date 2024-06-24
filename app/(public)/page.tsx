import Link from "next/link"
import { LoginForm } from "./_components/auth/login-form"

const Home = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Entre com suas credenciais e faça o login em sua conta.
          </p>
        </div>
        <div className="grid gap-4">
          <LoginForm />
        </div>
        <div className="mt-4 text-center text-sm">
          Ainda não tem uma conta?{" "}
          <Link href="/signup" className="underline">
            Registre-se
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
