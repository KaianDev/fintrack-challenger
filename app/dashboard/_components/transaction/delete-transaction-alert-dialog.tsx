"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

// Components
import { TransactionAlertDialog } from "."

interface DeleteTransactionAlertDialogProps {
  id: string
  onCloseSheet: () => void
}

export const DeleteTransactionAlertDialog = ({
  id,
  onCloseSheet,
}: DeleteTransactionAlertDialogProps) => {
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  const handleDeleteTransaction = () => {
    console.log(id)
    setOpenAlert(true)
  }

  const handleCloseDialogDelete = () => {
    onCloseSheet()
    setOpenAlert(false)
  }

  return (
    <>
      <TransactionAlertDialog
        title="Deseja deletar essa transação?"
        description="Uma vez deletada não poderá recuperá-la"
        onConfirm={handleDeleteTransaction}
        open={open}
        setOpen={setOpen}
        variant="delete"
      >
        <button className="flex items-center gap-1 text-xs font-bold text-secondary">
          Deletar Transação <Trash2 size={16} className="text-secondary" />
        </button>
      </TransactionAlertDialog>

      <TransactionAlertDialog
        title="Transação deletada!"
        description="A transação foi deletada com sucesso."
        open={openAlert}
        setOpen={setOpenAlert}
        onConfirm={handleCloseDialogDelete}
        variant="notify"
      />
    </>
  )
}
