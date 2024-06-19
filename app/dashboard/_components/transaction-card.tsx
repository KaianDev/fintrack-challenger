import { LucideIcon } from "lucide-react"

// Utilities
import { formatMoney } from "@/helpers/format-money"

// Components
import { Card, CardContent } from "@/components/ui/card"

interface TransactionCardProps {
  label: string
  value: number
  icon: LucideIcon
  color?: string
}

export const TransactionCard = ({
  value,
  label,
  icon,
  color,
}: TransactionCardProps) => {
  const Icon = icon

  return (
    <Card className="rounded-lg">
      <CardContent className="space-y-2 p-6">
        <div className="flex items-center gap-2">
          <div className="w-max rounded-lg bg-white/10 p-2">
            <Icon size={16} className={color} />
          </div>
          <p className="text-sm text-muted">{label}</p>
        </div>
        <p className="title">{formatMoney(value)}</p>
      </CardContent>
    </Card>
  )
}
