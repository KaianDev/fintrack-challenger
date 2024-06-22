import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

// Components
import { ChartBar, ChartDoughnut } from "./_components/chart"
import { DataTable, columns } from "./_components/table"
import {
  TransactionBalance,
  TransactionDialog,
} from "./_components/transaction"
import { getTransactions } from "./actions/transactions"

const Dashboard = async () => {
  const transactionData = await getTransactions()

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="title">Dashboard</h1>
        <div className="flex justify-between gap-2 sm:justify-end">
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

      <TransactionBalance />

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
