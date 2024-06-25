"use client"

import { PropsWithChildren } from "react"
import { LucideIcon } from "lucide-react"

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UserDialogProps extends PropsWithChildren {
  label: string
  title: string
  description: string
  icon: LucideIcon
  open: boolean
  setOpen: (v: boolean) => void
}

export const UserDialog = ({
  children,
  icon,
  label,
  title,
  description,
  open,
  setOpen,
}: UserDialogProps) => {
  const Icon = icon

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <Icon className="mr-2 h-4 w-4" />
        <span>{label}</span>
      </DialogTrigger>
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="title">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
