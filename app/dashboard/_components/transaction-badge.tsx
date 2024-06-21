import { Badge } from "@/components/ui/badge"
import { TransactionType } from "@/data/enum"
import { cn } from "@/lib/utils"

interface TransactionBadgeProps {
  type: TransactionType
}

export const TransactionBadge = ({ type }: TransactionBadgeProps) => {
  const getTypeLabel = () => {
    if (type === TransactionType.EXPENSE) return "Gasto"
    if (type === TransactionType.REVENUE) return "Ganho"
    return "Investimento"
  }
  const typeLabel = getTypeLabel()

  return (
    <Badge
      className={cn(
        "h-5 rounded-full",
        type === TransactionType.REVENUE && "bg-primary/10 hover:bg-primary/10",
        type === TransactionType.EXPENSE &&
          "bg-secondary/10 hover:bg-secondary/10",
        type === TransactionType.INVESTMENT &&
          "bg-tertiary/10 hover:bg-tertiary/10",
      )}
    >
      <div
        className={cn(
          "mr-2 size-2 rounded-full",
          type === TransactionType.REVENUE && "bg-primary",
          type === TransactionType.EXPENSE && "bg-secondary",
          type === TransactionType.INVESTMENT && "bg-tertiary",
        )}
      />
      {typeLabel}
    </Badge>
  )
}
