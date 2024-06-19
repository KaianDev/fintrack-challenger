"use client"

import Link from "next/link"

interface NavLinkProps {
  href: string
  label: string
}

export const NavLink = ({ href, label }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={"w-fit text-sm text-muted hover:font-bold hover:text-primary"}
    >
      {label}
    </Link>
  )
}
