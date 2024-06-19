import Image from "next/image"
import Link from "next/link"

// Components
import NavLink from "./nav-link"
import UserCard from "./user-card"

export const Header = () => {
  return (
    <header className="h-[72px] border-b">
      <div className="mx-auto flex h-full w-full max-w-[1378px] items-center justify-between px-8">
        <div className="flex items-center justify-center gap-12">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/fintrack-logo.svg"
              width={0}
              height={0}
              sizes="100vw"
              className="h-[29px] w-auto"
              alt="Logo FinTrack"
            />
            <strong className="title">FinTrack</strong>
          </Link>
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/analise" label="Análise" />
        </div>
        <UserCard />
      </div>
    </header>
  )
}