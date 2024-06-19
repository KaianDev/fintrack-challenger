import { Header } from "./_components/header"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-[1378px] p-8">{children}</div>
    </>
  )
}

export default Layout
