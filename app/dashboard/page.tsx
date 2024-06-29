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
import { TransactionSelectDate } from "./_components/transaction/transaction-select-date"
import { Suspense } from "react"

interface DashboardProps {
  searchParams: {
    selectedMonth?: string
    selectedYear?: string
  }
}

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const transactionData = await getTransactions({
    selectedMonth: searchParams.selectedMonth,
  })
  const balance = await getUserBalance({
    selectedMonth: searchParams.selectedMonth,
  })

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="title">Dashboard</h1>
        <div className="flex justify-between gap-2 sm:justify-end">
          <Suspense>
            <TransactionSelectDate />
          </Suspense>
          <TransactionDialog />
        </div>
      </div>

      <TransactionBalance
        selectedMonth={searchParams.selectedMonth}
        selectedYear={searchParams.selectedYear}
      />

      <section className="flex flex-col-reverse gap-6 xl:flex-row">
        <section className="flex-1 rounded-lg border bg-card">
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
