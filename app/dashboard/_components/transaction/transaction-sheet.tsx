"use client"

import { ExternalLink } from "lucide-react"

// Components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TransactionFormData } from "../../schemas"
import { TransactionForm } from "."
import { useState } from "react"
import { Transaction } from "../../types"

interface TransactionSheetProps {
  data: Transaction
}

export const TransactionSheet = ({ data }: TransactionSheetProps) => {
  const transactionId = data.id
  const [open, setOpen] = useState(false)

  const onSubmit = (data: TransactionFormData) => {
    console.log(data, { transactionId })
  }

  const handleClose = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="-mr-6 flex w-16 items-center justify-center text-muted transition-colors hover:text-white">
          <ExternalLink size={16} className="" />
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="border-b px-5 py-6">
          <SheetTitle className="title leading-none text-white">
            Transação
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 px-6 pb-6">
          <TransactionForm
            formType="update"
            confirmLabel="Salvar"
            data={data}
            onSubmit={onSubmit}
            onClose={handleClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
