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
import { TransactionTitle } from "../transaction-title"

// Utilities
import { Colors, TransactionType } from "@/data/enum"

ChartJS.register(ArcElement, Tooltip, Legend)

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
        getDataValue(TransactionType.REVENUE),
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
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 65,
} as ChartOptions<"doughnut">

export const ChartDoughnut = () => {
  const total = transactionData.reduce((acc, t) => acc + t.amount, 0)

  const getTotalForTypePercent = (type: TransactionType) => {
    const totalForType = Math.round((getDataValue(type) / total) * 100)
    return `${totalForType}%`
  }

  const revenue = getTotalForTypePercent(TransactionType.REVENUE)
  const expense = getTotalForTypePercent(TransactionType.EXPENSE)
  const investment = getTotalForTypePercent(TransactionType.INVESTMENT)

  return (
    <section className="flex flex-col items-center justify-center gap-12 rounded-lg bg-card px-12 py-6 sm:max-h-[218px] sm:flex-row">
      <div className="max-h-[170px] max-w-[170px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="w-full space-y-3 sm:max-w-52 lg:flex-1">
        <div className="flex items-center justify-between">
          <TransactionTitle
            icon={TrendingUp}
            label="Ganhos"
            color="text-primary"
          />
          <p className="text-sm font-bold">{revenue}</p>
        </div>
        <div className="flex items-center justify-between">
          <TransactionTitle
            icon={TrendingDown}
            label="Gastos"
            color="text-secondary"
          />
          <p className="text-sm font-bold">{expense}</p>
        </div>
        <div className="flex items-center justify-between">
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
