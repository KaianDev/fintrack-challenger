import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TransactionType } from "@prisma/client"

interface TransactionBadgeProps {
  type: TransactionType
}

export const TransactionBadge = ({ type }: TransactionBadgeProps) => {
  const getTypeLabel = () => {
    if (type === TransactionType.EXPENSE) return "Gasto"
    if (type === TransactionType.EARNING) return "Ganho"
    return "Investimento"
  }
  const typeLabel = getTypeLabel()

  return (
    <Badge
      className={cn(
        "h-5 rounded-full",
        type === TransactionType.EARNING && "bg-primary/10 hover:bg-primary/10",
        type === TransactionType.EXPENSE &&
          "bg-secondary/10 hover:bg-secondary/10",
        type === TransactionType.INVESTMENT &&
          "bg-tertiary/10 hover:bg-tertiary/10",
      )}
    >
      <div
        className={cn(
          "mr-2 size-2 rounded-full",
          type === TransactionType.EARNING && "bg-primary",
          type === TransactionType.EXPENSE && "bg-secondary",
          type === TransactionType.INVESTMENT && "bg-tertiary",
        )}
      />
      {typeLabel}
    </Badge>
  )
}
