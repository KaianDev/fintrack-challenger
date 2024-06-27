import { TransactionData } from "@/app/dashboard/types"
import { TransactionType } from "@prisma/client"
import dayjs from "dayjs"


export const getTransactionsToChartBars = (
  transactionData: TransactionData[],
) => {
  const transactionsMap = new Map<
    string,
    {
      date: Date
      type: TransactionType
      label: string
      amount: number
    }
  >()

  for (let transaction of transactionData) {
    const { date, amount, type } = transaction
    const key = `${type}-${date.getTime()}`

    if (transactionsMap.has(key)) {
      transactionsMap.get(key)!.amount += amount
    } else {
      transactionsMap.set(key, {
        amount,
        date,
        type,
        label: dayjs(date).format("DD"),
      })
    }
  }
  const transactions = Array.from(transactionsMap.values())
  return transactions.sort((a, b) => a.date.getTime() - b.date.getTime())
}
