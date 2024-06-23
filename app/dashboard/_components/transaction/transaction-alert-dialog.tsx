"use client"

import { Check, Loader, X } from "lucide-react"
import { PropsWithChildren } from "react"

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
import { Button, buttonVariants } from "@/components/ui/button"

// Utilities
import { cn } from "@/lib/utils"

interface TransactionAlertDialogProps extends PropsWithChildren {
  variant: "success" | "delete" | "notify"
  title: string
  description: string
  open: boolean
  isPending?: boolean
  setOpen: (v: boolean) => void
  onConfirm: () => void | Promise<void>
}

export const TransactionAlertDialog = ({
  description,
  title,
  variant,
  open,
  children,
  isPending,
  setOpen,
  onConfirm,
}: TransactionAlertDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-1">
            {variant === "success" && (
              <div className="flex size-[18px] items-center justify-center rounded-full bg-primary text-card">
                <Check size={14} strokeWidth={3} />
              </div>
            )}
            {variant === "delete" && (
              <div className="flex size-[18px] items-center justify-center rounded-full bg-secondary text-card">
                <X size={14} strokeWidth={3} />
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

          {variant === "delete" && (
            <>
              <AlertDialogCancel
                disabled={isPending}
                className={cn(buttonVariants({ variant: "cancel" }))}
              >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isPending}
                onClick={onConfirm}
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                {isPending ? (
                  <>
                    <Loader className="mr-1 size-4" />
                    Carregando...
                  </>
                ) : (
                  "Deletar"
                )}
              </AlertDialogAction>
            </>
          )}

          {variant === "notify" && (
            <AlertDialogAction
              onClick={onConfirm}
              className={cn(buttonVariants({ variant: "cancel" }))}
            >
              Confirmar
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
