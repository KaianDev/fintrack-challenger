"use client"

import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react"

// Components
import { FormLabel } from "@/components/ui/form"

// Utilities
import { Colors, TransactionType } from "@/data/enum"

interface TransactionSelectButtonProps {
  type: TransactionType
  value: string
}

export const TransactionSelectButton = ({
  type,
  value,
}: TransactionSelectButtonProps) => {
  const getValues = () => {
    if (type === TransactionType.EXPENSE)
      return {
        icon: TrendingDown,
        label: "Gasto",
        color: Colors.RED,
      }
    if (type === TransactionType.REVENUE)
      return {
        icon: TrendingUp,
        label: "Ganho",
        color: Colors.GREEN,
      }
    return {
      icon: PiggyBank,
      label: "Invest.",
      color: Colors.BLUE,
    }
  }

  const { icon: Icon, label, color } = getValues()

  return (
    <FormLabel
      className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 text-sm text-white"
      style={{
        color,
        borderColor: value === type ? color : "",
      }}
    >
      <Icon />
      {label}
    </FormLabel>
  )
}
