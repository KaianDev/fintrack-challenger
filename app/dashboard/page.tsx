import { Button } from "@/components/ui/button"
import {
  Calendar,
  PiggyBank,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { TransactionCard } from "./_components/transaction-card"

const Dashboard = () => {
  return (
    <main className="space-y-6">
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
        <TransactionCard label="Saldo" icon={Wallet} value={2700} />
        <TransactionCard
          label="Ganhos"
          icon={TrendingUp}
          value={8150}
          color="text-primary"
        />
        <TransactionCard
          label="Gastos"
          icon={TrendingDown}
          value={2950}
          color="text-secondary"
        />
        <TransactionCard
          label="Investimentos"
          icon={PiggyBank}
          value={2500}
          color="text-terciary"
        />
      </div>
    </main>
  )
}

export default Dashboard
