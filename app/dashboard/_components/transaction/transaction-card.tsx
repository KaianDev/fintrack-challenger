import { PropsWithChildren } from "react"

// Utilities
import { formatMoney } from "@/helpers/format-money"

// Components
import { Card, CardContent } from "@/components/ui/card"

interface TransactionCardProps extends PropsWithChildren {
  value: string
}

export const TransactionCard = ({ value, children }: TransactionCardProps) => {
  return (
    <Card className="rounded-lg">
      <CardContent className="space-y-2 p-6">
        {children}
        <p className="title">{formatMoney(Number(value))}</p>
      </CardContent>
    </Card>
  )
}
