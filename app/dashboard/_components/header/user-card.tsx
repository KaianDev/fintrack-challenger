"use client"

import { logout } from "@/actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"

interface UserCardProps {
  data: {
    first_name: string
    last_name: string
    email: string
  }
}

export const UserCard = ({ data }: UserCardProps) => {
  const { first_name, last_name } = data

  const handleLogout = async () => {
    await logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex h-10 items-center justify-center gap-2 rounded-lg border px-4">
          <Avatar className="size-5">
            <AvatarFallback>
              {first_name.charAt(0)}
              {last_name.charAt(0)}
            </AvatarFallback>
            <AvatarImage src="/avatar.png" sizes="20" />
          </Avatar>
          <p className="hidden text-white md:block">{`${first_name} ${last_name}`}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-card">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
