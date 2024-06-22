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
import { DataTable, columns } from "./_components/table"
import { transactionData } from "@/data/transaction"
import { TransactionDialog } from "./_components/trasancition-dialog"

const Dashboard = () => {
  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="title">Dashboard</h1>
        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Março
          </Button>
          <TransactionDialog />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="flex flex-col-reverse gap-6 xl:flex-row">
        <section className="flex-1 rounded-lg bg-card">
          <DataTable data={transactionData} columns={columns} />
        </section>

        <div className="flex w-full flex-col gap-6 lg:flex-row xl:max-w-lg xl:flex-col">
          <ChartDoughnut />
          <ChartBar />
        </div>
      </section>
    </main>
  )
}

export default Dashboard
