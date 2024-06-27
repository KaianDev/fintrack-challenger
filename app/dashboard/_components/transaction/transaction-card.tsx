import { PropsWithChildren } from "react"

// Utilities
import { formatMoney } from "@/helpers"

// Components
import { Card, CardContent } from "@/components/ui/card"

interface TransactionCardProps extends PropsWithChildren {
  value: number
}

export const TransactionCard = ({ value, children }: TransactionCardProps) => {
  return (
    <Card className="rounded-lg">
      <CardContent className="space-y-2 p-6">
        {children}
        <p className="title">{formatMoney(value)}</p>
      </CardContent>
    </Card>
  )
}
