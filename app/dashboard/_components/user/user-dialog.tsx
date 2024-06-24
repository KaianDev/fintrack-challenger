"use client"

import { PropsWithChildren, useState } from "react"

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserUpdateForm } from "./user-update-form"

interface UserDialogProps extends PropsWithChildren {
  data: {
    first_name: string
    last_name: string
  }
}

export const UserDialog = ({ children, data }: UserDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="title">Meu Perfil</DialogTitle>
        </DialogHeader>
        <UserUpdateForm onClose={handleClose} data={data} />
      </DialogContent>
    </Dialog>
  )
}
