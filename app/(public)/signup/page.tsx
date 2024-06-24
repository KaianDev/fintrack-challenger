import Link from "next/link"
import { SignUpForm } from "../_components/auth/signup-form"

const SignUp = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Registre-se</h1>
          <p className="text-balance text-muted-foreground">
            Preencha seus dados e vamos juntos simplificar suas gestão
            financeira.
          </p>
        </div>
        <SignUpForm />
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/" className="underline">
            Faça o login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
