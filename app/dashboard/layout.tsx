import { auth } from "@/lib/auth"
import { Header } from "./_components/header"
import { redirect } from "next/navigation"

const Layout = async ({ children }: React.PropsWithChildren) => {
  // const session = await auth()
  // if (!session?.user) redirect("/")

  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-[1378px] p-8">{children}</div>
    </>
  )
}

export default Layout
