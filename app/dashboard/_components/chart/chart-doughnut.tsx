"use client"

import { transactionData } from "@/data/transaction"
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react"

// Components
import { TransactionTitle } from "../transaction/transaction-title"

// Utilities
import { Colors, TransactionType } from "@/data/enum"
import { Transaction } from "../../types"

ChartJS.register(ArcElement, Tooltip, Legend)

interface ChartDoughnutProps {
  transactions: Transaction[]
}

export const ChartDoughnut = () => {
  const getDataValue = (type: TransactionType) => {
    return transactionData
      .filter((t) => t.type === type)
      .reduce((acc, t) => {
        return (acc = acc + t.amount)
      }, 0)
  }

  const data = {
    labels: ["Ganhos", "Gastos", "Investimentos"],
    datasets: [
      {
        label: "",
        data: [
          getDataValue(TransactionType.EARNING),
          getDataValue(TransactionType.EXPENSE),
          getDataValue(TransactionType.INVESTMENT),
        ],
        backgroundColor: [Colors.GREEN, Colors.RED, Colors.BLUE],
        borderRadius: 8,
        borderWidth: 0,
        spacing: 8,
      },
    ],
  } as ChartData<"doughnut">

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: 65,
  } as ChartOptions<"doughnut">

  const total = transactionData.reduce((acc, t) => acc + t.amount, 0)

  const getTotalForTypePercent = (type: TransactionType) => {
    const totalForType = Math.round((getDataValue(type) / total) * 100)
    return `${totalForType}%`
  }

  const earning = getTotalForTypePercent(TransactionType.EARNING)
  const expense = getTotalForTypePercent(TransactionType.EXPENSE)
  const investment = getTotalForTypePercent(TransactionType.INVESTMENT)

  return (
    <section className="flex items-center justify-center gap-6 rounded-lg border bg-card px-12 py-6 sm:flex-row sm:gap-12 xl:max-h-[218px]">
      <div className="hidden sm:block sm:max-h-[170px] sm:max-w-[170px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="w-full space-y-3 sm:max-w-52 lg:flex-1">
        <div className="flex items-center justify-between gap-2">
          <TransactionTitle
            icon={TrendingUp}
            label="Ganhos"
            color="text-primary"
          />
          <p className="text-sm font-bold">{earning}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <TransactionTitle
            icon={TrendingDown}
            label="Gastos"
            color="text-secondary"
          />
          <p className="text-sm font-bold">{expense}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <TransactionTitle
            icon={PiggyBank}
            label="Investimentos"
            color="text-tertiary"
          />
          <p className="text-sm font-bold">{investment}</p>
        </div>
      </div>
    </section>
  )
}
