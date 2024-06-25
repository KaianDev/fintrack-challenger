"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Lock } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserDialog, UserUpdateForm, UserUpdatePasswordForm } from "."

// Utilities
import { logout } from "@/actions"

interface UserCardProps {
  data: {
    first_name: string
    last_name: string
    email: string
  }
}

export const UserCard = ({ data }: UserCardProps) => {
  const { first_name, last_name } = data
  const [openProfile, setOpenProfile] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)

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
          <p className="hidden capitalize text-white md:block">{`${first_name} ${last_name}`}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-card">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <UserDialog
              open={openProfile}
              setOpen={setOpenProfile}
              title="Meu Perfil"
              description="Altere seus dados pessoais"
              label="Perfil"
              icon={User}
            >
              <UserUpdateForm
                data={data}
                onClose={() => setOpenProfile(false)}
              />
            </UserDialog>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <UserDialog
              open={openPassword}
              setOpen={setOpenPassword}
              title="Alterar senha"
              description="Defina uma nova senha"
              label="Alterar senha"
              icon={Lock}
            >
              <UserUpdatePasswordForm onClose={() => setOpenPassword(false)} />
            </UserDialog>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 size-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
