"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

// Components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"

// Utilities
import { TransactionFormData } from "../schema"
import { TransactionAlertDialog } from "./transaction-alert-dialog"

export const TransactionDialog = () => {
  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const handleCloseDialog = () => setOpen(false)
  const handleSubmit = async (data: TransactionFormData) => {
    console.log(data)
    setOpen(false)
    setAlertOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center justify-center gap-2">
            Nova transação
            <Plus size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[350px]">
          <DialogHeader>
            <DialogTitle className="title text-center">
              Adicionar Transação
            </DialogTitle>
            <DialogDescription className="text-center">
              Insira as informações abaixo
            </DialogDescription>
          </DialogHeader>
          <div>
            <TransactionForm
              confirmLabel="Adicionar"
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>

      {alertOpen && (
        <TransactionAlertDialog
          variant="success"
          title="Transação adicionada"
          description="A transação foi adicionada com sucesso"
          open={alertOpen}
          setOpen={setAlertOpen}
          onConfirm={() => setAlertOpen(false)}
        />
      )}
    </>
  )
}
