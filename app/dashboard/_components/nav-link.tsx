"use client"

import Link from "next/link"

interface NavLinkProps {
  href: string
  label: string
}

const NavLink = ({ href, label }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={
        "text-sm text-muted w-fit hover:font-bold hover:text-primary"
      }
    >
      {label}
    </Link>
  )
}

export default NavLink
