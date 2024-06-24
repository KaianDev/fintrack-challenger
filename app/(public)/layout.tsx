import { auth } from "@/lib/auth"
import Image from "next/image"
import { redirect } from "next/navigation"

import { PropsWithChildren } from "react"

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth()

  if (session?.user) redirect("/dashboard")

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {children}
      <div className="hidden flex-col items-center justify-center gap-12 bg-primary text-card lg:flex">
        <h1 className="text-center text-3xl font-bold">
          Assuma o controle das{" "}
          <span className="text-white">suas finanças!</span>
          <br /> Entre agora e simplifique <br />{" "}
          <span className="text-white">sua gestão financeira.</span>
        </h1>
        <div className="flex gap-2">
          <Image
            src="/fintrack-logo.svg"
            alt="Image"
            width="0"
            height="0"
            sizes="100vh"
            className="w-20 object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <h2 className="text-3xl font-bold text-white">Fintrack</h2>
        </div>
      </div>
    </div>
  )
}

export default Layout
