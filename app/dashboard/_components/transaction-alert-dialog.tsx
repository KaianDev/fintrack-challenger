"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionAlertDialogProps {
  variant: "success" | "delete" | "notify"
  title: string
  description: string
  open: boolean
  setOpen: (v: boolean) => void
  onConfirm: () => void
}

export const TransactionAlertDialog = ({
  description,
  title,
  variant,
  open,
  setOpen,
  onConfirm,
}: TransactionAlertDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-1">
            {variant === "success" && (
              <div className="flex size-[18px] items-center justify-center rounded-full bg-primary text-card">
                <Check size={14} />
              </div>
            )}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {variant === "success" && (
            <AlertDialogAction asChild>
              <Button onClick={onConfirm}>Confirma</Button>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
