import { Button } from "@/components/ui/button"
import {
  Calendar,
  PiggyBank,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react"

// Components
import { TransactionCard } from "./_components/transaction-card"
import { TransactionTitle } from "./_components/transaction-title"
import { ChartBar, ChartDoughnut } from "./_components/chart"

const Dashboard = () => {
  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="title">Dashboard</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Março
          </Button>
          <Button className="flex items-center justify-center gap-2">
            Nova transação
            <Plus size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <TransactionCard value={2700}>
          <TransactionTitle icon={Wallet} label="Saldo" />
        </TransactionCard>
        <TransactionCard value={8150}>
          <TransactionTitle
            icon={TrendingUp}
            color={"text-primary"}
            label="Ganhos"
          />
        </TransactionCard>
        <TransactionCard value={2950}>
          <TransactionTitle
            icon={TrendingDown}
            color={"text-secondary"}
            label="Gastos"
          />
        </TransactionCard>
        <TransactionCard value={2500}>
          <TransactionTitle
            icon={PiggyBank}
            color={"text-tertiary"}
            label="Investimentos"
          />
        </TransactionCard>
      </div>

      <section className="flex gap-6">
        <section className="flex-1 rounded-lg bg-card">...</section>

        <div className="flex w-full max-w-lg flex-col space-y-6">
          <ChartDoughnut />
          <ChartBar />
        </div>
      </section>
    </main>
  )
}

export default Dashboard
