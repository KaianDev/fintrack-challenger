"use client"

import { TransactionType } from "../../types"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("pt-br")

// Utilities
import { Colors } from "@/data/enum"
import { TransactionData } from "../../types"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartBarProps {
  transactionData: TransactionData[]
}

export const ChartBar = ({ transactionData }: ChartBarProps) => {
  const labels = transactionData
    .slice(0, 10)
    .map((t) => dayjs(t.date).utc().get("D"))

  const data = {
    labels,
    datasets: [
      {
        data: transactionData.slice(0, 10).map((t) => t.amount),
        backgroundColor: transactionData.map((t) => {
          if (t.type === TransactionType.EARNING) return Colors.GREEN
          if (t.type === TransactionType.EXPENSE) return Colors.RED
          if (t.type === TransactionType.INVESTMENT) return Colors.BLUE
        }),
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  } as ChartData<"bar">

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  } as ChartOptions<"bar">

  return (
    <div className="flex-1 space-y-6 rounded-lg border bg-card p-6">
      <div>
        <p className="mb-6 font-bold">Movimentações</p>
        <div className="space-y-1">
          <strong className="title">
            {transactionData.length === 1
              ? "1 Transação"
              : `${transactionData.length} Transações`}
          </strong>
          <p className="text-sm text-muted">Ao longo do mês</p>
        </div>
      </div>
      <div className="h-full lg:max-h-[236px]">
        <Bar
          options={options}
          data={data}
          className="mx-auto h-full w-full max-w-full bg-card sm:max-w-sm md:max-w-md"
        />
      </div>
    </div>
  )
}
