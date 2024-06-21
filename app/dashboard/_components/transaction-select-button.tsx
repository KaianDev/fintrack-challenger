import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react"

// Utilities
import { Colors, TransactionType } from "@/data/enum"

interface TransactionSelectButtonProps {
  type: TransactionType
  selected: boolean
}

export const TransactionSelectButton = ({
  type,
  selected,
}: TransactionSelectButtonProps) => {
  const getIcon = () => {
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

  const { icon: Icon, label, color } = getIcon()

  return (
    <button
      type="button"
      className="flex h-10 items-center justify-center gap-2 rounded-xl border text-sm text-white"
      style={{ borderColor: selected ? color : undefined }}
    >
      <Icon style={{ color }} />
      {label}
    </button>
  )
}
