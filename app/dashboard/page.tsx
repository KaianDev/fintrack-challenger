import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"

dayjs.locale("pt-br")

// Components
import { ChartBar, ChartDoughnut } from "./_components/chart"
import { DataTable, columns } from "./_components/table"
import {
  TransactionBalance,
  TransactionDialog,
} from "./_components/transaction"

// Utilities
import { getTransactions } from "./_actions/transactions"
import { getUserBalance } from "./_actions/user"

const Dashboard = async () => {
  const id = "fab4537e-fd5a-4bca-be99-ffe64eb74ee5"
  const transactionData = await getTransactions()
  const balance = await getUserBalance(id)

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="title">Dashboard</h1>
        <div className="flex justify-between gap-2 sm:justify-end">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 hover:bg-card"
          >
            <Calendar size={16} />
            <span className="capitalize">
              {dayjs(new Date()).format("MMMM")}
            </span>
          </Button>
          <TransactionDialog />
        </div>
      </div>

      <TransactionBalance />

      <section className="flex flex-col-reverse gap-6 xl:flex-row">
        <section className="flex-1 rounded-lg bg-card">
          <DataTable data={transactionData} columns={columns} />
        </section>

        {transactionData.length > 0 && (
          <div className="flex w-full flex-col gap-6 lg:flex-row xl:max-w-lg xl:flex-col">
            <ChartDoughnut balanceData={balance} />
            <ChartBar transactionData={transactionData} />
          </div>
        )}
      </section>
    </main>
  )
}

export default Dashboard
