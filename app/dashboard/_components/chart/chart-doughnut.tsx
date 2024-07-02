"use client"

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
import { Colors } from "@/data/enum"
import { Balance } from "../../types"
import { formatMoney } from "@/helpers"

ChartJS.register(ArcElement, Tooltip, Legend)

interface ChartDoughnutProps {
  balanceData: Balance
}

export const ChartDoughnut = ({ balanceData }: ChartDoughnutProps) => {
  const { earnings, expenses, investments } = balanceData
  const data = {
    labels: ["Ganhos", "Gastos", "Investimentos"],
    datasets: [
      {
        label: "",
        data: [earnings, expenses, investments],
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
      tooltip: {
        callbacks: {
          label: ({ dataIndex, dataset }) => {
            const label = dataset.data[dataIndex] || 0
            return formatMoney(label as number)
          },
        },
      },
    },

    cutout: 65,
  } as ChartOptions<"doughnut">

  const total = earnings + expenses + investments

  const getTotalForTypePercent = (value: number) => {
    if (total === 0) return `0%`
    const percent = ((value / total) * 100).toFixed()
    return `${percent}%`
  }

  const earningPercent = getTotalForTypePercent(earnings)
  const expensePercent = getTotalForTypePercent(expenses)
  const investmentPercent = getTotalForTypePercent(investments)

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
          <p className="text-sm font-bold">{earningPercent}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <TransactionTitle
            icon={TrendingDown}
            label="Gastos"
            color="text-secondary"
          />
          <p className="text-sm font-bold">{expensePercent}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <TransactionTitle
            icon={PiggyBank}
            label="Investimentos"
            color="text-tertiary"
          />
          <p className="text-sm font-bold">{investmentPercent}</p>
        </div>
      </div>
    </section>
  )
}
