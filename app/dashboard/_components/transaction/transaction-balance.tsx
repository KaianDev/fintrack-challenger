import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react"

// Components
import { TransactionCard, TransactionTitle } from "."

// Utilities
import { getUserBalance } from "../../_actions/user"

interface TransactionBalanceProps {
  selectedMonth?: string
  selectedYear?: string
}

export const TransactionBalance = async ({
  selectedMonth,
  selectedYear,
}: TransactionBalanceProps) => {
  const { balance, earnings, expenses, investments } = await getUserBalance({
    selectedMonth,
    selectedYear,
  })

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <TransactionCard value={balance}>
        <TransactionTitle icon={Wallet} label="Saldo" />
      </TransactionCard>
      <TransactionCard value={earnings}>
        <TransactionTitle
          icon={TrendingUp}
          color={"text-primary"}
          label="Ganhos"
        />
      </TransactionCard>
      <TransactionCard value={expenses}>
        <TransactionTitle
          icon={TrendingDown}
          color={"text-secondary"}
          label="Gastos"
        />
      </TransactionCard>
      <TransactionCard value={investments}>
        <TransactionTitle
          icon={PiggyBank}
          color={"text-tertiary"}
          label="Investimentos"
        />
      </TransactionCard>
    </div>
  )
}
