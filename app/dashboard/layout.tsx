import { Header } from "./_components/header"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
